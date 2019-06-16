import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Editor from "./editor";
import Teams from "./teams";
import Debug from "./debug";

const App = () => {
  return (
    <div className="App">
      <Editor />
      <Teams />
      <Debug />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
