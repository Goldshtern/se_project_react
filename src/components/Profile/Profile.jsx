import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  weatherData,
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditProfileClick={handleEditProfileClick} />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          weatherData={weatherData}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
