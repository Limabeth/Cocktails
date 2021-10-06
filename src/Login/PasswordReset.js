import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { auth } from "../Firebase/Firebase.js";

import Loading from "../Loading.js";

import "../styles/PasswordReset.css";

const PasswordReset = () => {
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const emailRef = useRef();

  const userPasswordReset = async (e) => {
    e.preventDefault()
    try {
      setError(null);
      setLoading(true);
      setEmailHasBeenSent(false);
      await auth.sendPasswordResetEmail(emailRef.current.value);
      setEmailHasBeenSent(true);
    } catch (error) {
      setError("Error resetting password");
      console.log(error);
    }
    setLoading(false);
  };

  if(loading) {
    return <Loading/>;
  }

  return (
    <div className="pw-reset-container">
      <div className="pw-reset-wrapper">
        <span>Reset your password</span>
        <form action="">
          {emailHasBeenSent && <span>An email has been sent to you!</span>}
          {error !== null && <span>{error}</span>}
          <label htmlFor="userEmail" className="w-full block">
            Email:
          </label>
          <input type="email" name="userEmail" id="userEmail" ref={emailRef} />
          <button onClick={(e) => {userPasswordReset(e)}}>Reset</button>
        </form>
        <Link to="/SignIn">Back to sign in page</Link>
      </div>
    </div>
  );
};

export default PasswordReset;
