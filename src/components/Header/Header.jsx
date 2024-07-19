import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">NAME</p>
        <img className="header__avatar" src={avatar} alt="App avatar" />
      </div>
    </header>
  );
}

export default Header;
