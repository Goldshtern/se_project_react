import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ onClose, isOpen, handleSubmit }) {
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
      <label htmlFor="name" className="modal__label-form">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          //{name}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label-form">
        Avatar URL{" "}
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar Url"
          name="avatarUrl"
          //value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
