import React from "react";
import styled, { ThemeProvider } from "styled-components";

const AwesomeButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  cursor: pointer;

  /* Color the border and text with theme.main */
  background: ${props => props.theme.color};
  border: 2px solid ${props => props.theme.color};
`;

function Provider(Component) {
  return class extends React.Component {
    render() {
      return (
        <ThemeProvider theme={{ color: "mediumseagreen" }}>
          <Component {...this.props} />
        </ThemeProvider>
      );
    }
  };
}

export default function() {
  return [{ Components: { AwesomeButton } }, Provider];
}
