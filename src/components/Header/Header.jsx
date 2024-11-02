import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginClick,
  handleSignUpClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className={`header__add-clothes-button ${
            !isLoggedIn ? "header__add_button_hidden" : ""
          }`}
        >
          + Add clothes
        </button>
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              <img
                className="header__avatar"
                src={currentUser?.avatarUrl}
                alt={currentUser?.name}
              />
            </div>
          </Link>
        ) : (
          <div className="header__autor">
            <button className="header__register" onClick={handleSignUpClick}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
