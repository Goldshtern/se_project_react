import { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //const [currentTemperatureUnit, handleToggleSwitchChange] = useState("C");

  //const handleChange = (e) => {
  //if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  //};
  //console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);

  return (
    <label className="toggle">
      <input
        className="toggle__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      ></input>
      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggle__slider toggle__slider-F"
            : "toggle__slider toggle__slider-C"
        }
      ></span>
      <p
        className={`toggle__temp-F ${
          currentTemperatureUnit === "F" && "toggle__active"
        }`}
      >
        F
      </p>
      <p
        className={`toggle__temp-C ${
          currentTemperatureUnit === "C" && "toggle__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
