import React from "react";
import { Link } from "react-router-dom";

import "./styles/Error.css";

const IMG_Error = require("./images/error.png").default;

const Error = () => {
  return (
    <div className="error">
      <span>This is not the path you seek.</span>
      <img src={IMG_Error} alt="404 Error" />
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Error;
