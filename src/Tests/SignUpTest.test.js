import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import SignUp from "../Login/SignUp.js";
import SignIn from "../Login/SignIn.js";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import { expect } from "@jest/globals";

/* -----На всякий случай. Я не знаю как это использовать, но пусть будет.----- */
//import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
//import Enzyme, { mount, shallow, render } from "enzyme";
//Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);

describe("signup tests", () => {
  /* Проверяем может ли пользователь создать аккаунт если введены неверные данные. Если так, то кнопка Sign Up должна быть выключена. */
  it("should make sure user cannot create an account with wrong data", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const button = screen.getByText(/Sign Up/i);

    const nameInput = screen.getByTestId("nameSignUp");
    const emailInput = screen.getByTestId("emailSignUp");
    const passwordInput = screen.getByTestId("passwordSignUp");

    userEvent.type(nameInput, "NN");
    expect(nameInput).toHaveValue("NN");

    userEvent.type(emailInput, "usermail.com");
    expect(emailInput).toHaveValue("usermail.com");

    userEvent.type(passwordInput, "00");
    expect(passwordInput).toHaveValue("00");

    expect(button.disabled).toEqual(true);
  });

  /* Проверяем может ли пользователь создать аккаунт с данными, которые удовлетворяют регулярным выражениям из проверки. */
  it("should let user create an account if the data provided is correct", () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );

    const button = screen.getByText(/Sign Up/i);

    const nameInput = screen.getByTestId("nameSignUp");
    const emailInput = screen.getByTestId("emailSignUp");
    const passwordInput = screen.getByTestId("passwordSignUp");

    userEvent.type(nameInput, "Homer");
    expect(nameInput).toHaveValue("Homer");

    userEvent.type(emailInput, "homer@gmail.com");
    expect(emailInput).toHaveValue("homer@gmail.com");

    userEvent.type(passwordInput, "HH00009999");
    expect(passwordInput).toHaveValue("HH00009999");

    expect(button.disabled).toEqual(false);
  });
});
