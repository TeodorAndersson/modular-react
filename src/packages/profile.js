import React, { Component } from "react";
import { CoreContext } from "../core/packageLoader";

const Birthday = ({ age }) => {
  return `${age} years ago`;
};

class Profile extends Component {
  static contextType = CoreContext;

  render() {
    let { name, age } = this.context;
    let { Birthday } = this.context.Components;
    return (
      <>
        <span>Name: {name} </span>
        <Birthday age={age} />
        <span>Address: {this.props.address} </span>
      </>
    );
  }
}

export default function() {
  return [{ Components: { Profile, Birthday } }, null];
}
