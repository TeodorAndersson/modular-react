import React from "react";

const Birthday = ({ age }) => {
  return <span>{`Not ${age} years ago`}</span>;
};

export default function() {
  return [{ Components: { Birthday } }, null];
}
