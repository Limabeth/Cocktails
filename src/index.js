import 'react-app-polyfill/ie9';

import React from "react";
import ReactDOM from "react-dom";

import "./styles/style.css";

import App from "./App.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app-root")
);
