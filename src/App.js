import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { CoreContext } from "./core/packageLoader";
import PackageLoader from "./core/packageLoader";

class App extends Component {
  static contextType = CoreContext;

  render() {
    const { Profile, AwesomeButton } = this.context.Components;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Profile address="Lisbon" />
          <AwesomeButton onClick={() => { PackageLoader.load('lazyLoad')}}>
            Lazy load something
          </AwesomeButton>
        </header>
      </div>
    );
  }
}

export default App;
