import React from "react";

import "./styles/NoUser.css";

const IMG_NoUser = require("./images/nouser.png").default;

const NoUser = () => {
  return (
    <div className="no-user">
      <span>Create an account to make your own list of favourite drinks!</span>
      <img src={IMG_NoUser} alt="Star"></img>
    </div>
  );
};

export default NoUser;
