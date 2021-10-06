import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { auth } from "../Firebase/Firebase.js";

import Loading from "../Loading.js";

import "../styles/SignIn.css";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    }
    setLoading(false);
  }

  if(loading) {
    return <Loading/>;
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper" data-testid="sign-in-wrapper">
        <span>Sign In</span>
        {error !== null && <span className="sign-in-error">{error}</span>}
        <form className="signin-form" data-testid="signInForm">
          <label htmlFor="userEmail"></label>
          <br />
          <input
            type="email"
            name="userEmail"
            placeholder="email"
            data-testid="emailSignIn"
            id="userEmail"
            ref={emailRef}

          />
          <br />
          <label htmlFor="userPassword"></label>
          <br />
          <input
            type="password"
            name="userPassword"
            placeholder="password"
            data-testid="passwordSignIn"
            id="userPassword"
            ref={passwordRef}
       
          />
          <br />
          <button
            onClick={(e) => {loginUser(e)}}
          >
            Login
          </button>
        </form>
        <Link to="/SignUp" className="sign-up-link">
          Sign Up
        </Link>{" "}
        <br />{" "}
        <Link to="/passwordReset" className="pw-reset-link">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
