import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="user" />
      <p className="sidebar__user-name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
