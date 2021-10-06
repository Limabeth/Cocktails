import React from "react";
import { Link } from "react-router-dom";

import "./styles/Error.css";

const Error = () => {
  return (
    <div className="error">
      <span>This is not the path you seek.</span>
      <img src={"/images/error.png"} alt="404 Error" />
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default Error;
