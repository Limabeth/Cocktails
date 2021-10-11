import "react-app-polyfill/ie9";

import React from "react";
import ReactDOM from "react-dom";

import "./styles/style.css";

import App from "./App.js";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("app-root")
);
