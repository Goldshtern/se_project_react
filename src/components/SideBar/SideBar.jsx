import "./SideBar.css";
//import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfileClick }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__avatar-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatarUrl}
          alt={currentUser?.name}
        />
        <p className="sidebar__user-name">{currentUser.name}</p>
      </div>

      <div className="sidebar__buttons-container">
        <button
          className="sidebar__edit-profile-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
      </div>
    </div>
  );
}

export default SideBar;
