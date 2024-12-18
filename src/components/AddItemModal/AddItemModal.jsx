import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
const AddItemModal = ({ closeActiveModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onAddItem({ name, imageUrl, weather });
    setIsLoading(false);
  };

  const isFormValid = () => {
    return name && imageUrl && weather;
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-form">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          value={name}
          onChange={handleNameChange}
          id="name"
          placeholder="Name"
        />
      </label>
      <label className="modal__label-form">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          value={imageUrl}
          id="imageURL"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            name="input"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            value="warm"
            name="input"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            name="input"
            className="modal__radio-input"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
        <button
          type="submit"
          className={`register__link ${isFormValid() ? "active" : ""}`}
        >
          Add garment
        </button>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
