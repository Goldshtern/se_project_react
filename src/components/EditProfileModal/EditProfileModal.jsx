import React, { useState, useContext, useEffect } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfile = ({ onClose, isOpen, handleEditUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: currentUser || "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      setData({
        name: currentUser.name || "",
        avatarUrl: currentUser.avatarUrl || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditUser(data);
    console.log(handleSubmit);
  };

  const isFormValid = () => {
    return data.name && data.avatarUrl;
  };

  return (
    <ModalWithForm
      title="Change profile data"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label-form">
        Name*{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder={currentUser.name}
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label-form">
        Avatar URL*{" "}
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
      <button
        type="submit"
        className={`register__link ${isFormValid() ? "active" : ""}`}
      >
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfile;
