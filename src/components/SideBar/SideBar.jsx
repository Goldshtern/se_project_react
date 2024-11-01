import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfileClick, handleSignOut }) {
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
          type="button"
          className="sidebar__edit-profile-btn"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__logout-profile-btn"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
