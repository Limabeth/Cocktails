import React from "react";

import "./styles/NoUser.css";

const NoUser = () => {
  return (
    <div className="no-user">
      <span>Create an account to make your own list of favourite drinks!</span>
      <img src={"/images/nouser.png"} alt="Star"></img>
    </div>
  );
};

export default NoUser;
