import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Login = ({ onClose, isOpen, handleLogin, handleSignUpClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isFormValid = () => {
    return data.email && data.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
    console.log(handleSubmit);
  };

  return (
    <ModalWithForm
      title="Login"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label-form">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label-form">
        Password*{" "}
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>
      <div className="login__button-container">
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Login in
        </button>
        <button
          type="button"
          className="login__login-link"
          to="login"
          onClick={handleSignUpClick}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default Login;
