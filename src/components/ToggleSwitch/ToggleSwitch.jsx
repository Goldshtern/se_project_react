import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

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
        className={`toggle__temp-C ${
          currentTemperatureUnit === "F" && "toggle__active"
        }`}
      >
        C
      </p>
      <p
        className={`toggle__temp-F ${
          currentTemperatureUnit === "C" && "toggle__active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
