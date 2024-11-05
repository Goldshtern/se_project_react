import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const Register = ({
  onClose,
  isOpen,
  handleRegistration,
  handleLoginClick,
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatarUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return data.email && data.password && data.name && data.avatarUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleRegistration(data);
    setIsLoading(false);
    console.log(handleSubmit);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={isLoading ? "Registering..." : "Register"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-form">
        Email
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
      <label className="modal__label-form">
        Password *
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
      <label className="modal__label-form">
        Name
        <input
          type="text"
          className="modal__input"
          id="name-reg"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label-form">
        Avatar URL{" "}
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar Url"
          name="avatarUrl"
          value={data.avatarUrl}
          onChange={handleChange}
        />
      </label>
      <div className="register__button-container">
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Sign up
        </button>
        <button
          type="button"
          className="register__login-link"
          to="login"
          onClick={handleLoginClick}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default Register;
