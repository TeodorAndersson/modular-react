import React from "react";
import * as deepmerge from "deepmerge";
import compose from "../core/helper";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "../App";

let CoreContext = React.createContext({});
let Provider = CoreContext.Provider;
let Consumer = CoreContext.Consumer;

export class PackageLoader {
  store = {};

  CoreProvider = WrappedComponent => {
    return class extends React.Component {
      render() {
        return (
          <HashRouter basename="/">
            <WrappedComponent {...this.props} />
          </HashRouter>
        );
      }
    };
  };

  load(...packagesList) {
    const loadingPromises = packagesList.map(pack =>
      import(`../packages/${pack}`)
    );

    return Promise.all(loadingPromises).then(packages => {
      packages.forEach(p => {
        this.setup(p);
      });
    }).then(() => this.run());
  }

  setup(p) {
    let [storeChanges, newProvider] = p.default();
    this.store = deepmerge(this.store, storeChanges);
    if (newProvider !== null) {
      this.CoreProvider = compose(
          this.CoreProvider,
          newProvider
      );
    }
  }

  run(){
    const CoreProvider = this.CoreProvider(CoreContext.Provider);
    ReactDOM.render(
     <CoreProvider value={this.store}>
        <App />
      </CoreProvider>,
      document.getElementById("root")
    );
  }
}

export default new PackageLoader();
export { CoreContext, Provider, Consumer };
