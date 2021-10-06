import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth, provider, createUserDocument, createDefaultUserDocument } from "../Firebase/Firebase.js";

import Loading from "../Loading.js";

import "../styles/SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const [loading, setLoading] = useState();

  const [error, setError] = useState(null);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      createUserDocument(user, {displayName});
    } catch (error) {
      setError('Failed to create an account');
      console.log(error);
    }

    setEmail("");
    setPassword("");
    setDisplayName("");

    setLoading(false);
  }

  const LoginWithGoogle = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const {user} = await auth.signInWithPopup(provider);
      createDefaultUserDocument(user);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget;

    switch(name) {
      case "userEmail":
        checkEmail(value);
        break;
      case "userPassword":
        checkPassword(value);
        break;
      case "displayName":
        checkName(value);
        break;
      default:
        break;
    }
  };

  const checkName = (data) => {
    const regExp = /^[a-zA-Z].{4,16}$/;
    data.match(regExp) ? setDisplayName(data) : setDisplayName("");
  }

  const checkEmail = (data) => {
    const regExp = /\S+@\S+\.\S+/;
    data.match(regExp) ? setEmail(data) : setEmail("");
  }

  const checkPassword = (data) => {
    const regExp = /^[a-zA-Z0-9].{8,32}$/;
    data.match(regExp) ? setPassword(data) : setPassword("");
  }

  const isButtonDisabled = () => {
    const userData = [displayName, email, password];

    const check = () => {
      return userData.some((item) => item === "" || item === undefined)
    }

    if (check()) {
      return true;
    } else {
      return false;
    }
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-wrapper">
      <span>Create an account</span>
        {error !== null && (
          <span className="sign-up-error">
            {error}
          </span>
        )}
        <form className="sign-up-form">
          <label htmlFor="displayName">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            data-testid="nameSignUp"
            onChange={event => onChangeHandler(event)}
          />
          <span>{displayName === "" && ("Name must contain only letters of English alphabet and be between 4 and 16 characters.")}</span>

          <label htmlFor="userEmail">
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            data-testid="emailSignUp"
            onChange={event => onChangeHandler(event)}
          />
          <span>{email === "" && "Please enter a correct email address."}</span>

          <label htmlFor="userPassword">
            Password:
          </label>
          <input
            type="password"
            name="userPassword"
            data-testid="passwordSignUp"
            onChange={event => onChangeHandler(event)}
          />
          <span>{password === "" && ("Password must contain only numbers and letters of English alphabet. Password must also be between 8 and 32 characters")}</span>

          <button
            disabled={isButtonDisabled()}
            onClick={(e) => createUser(e)}
          >
            Sign up
          </button>
        </form>
        <span>OR</span>
        <button onClick={(e) => LoginWithGoogle(e)}>
          Sign In with Google
        </button>
        <div>
        <span>Already have an account?{" "}</span>
          <Link to="/SignIn">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;