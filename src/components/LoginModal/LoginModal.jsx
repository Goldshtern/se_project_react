import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ onClose, isOpen, handleSubmit }) {
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label-form">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          //value={email}
        />
      </label>
      <label htmlFor="password" className="modal__label-form">
        Password *
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          //value={password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
