import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  console.log(clothingItems);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes-items">
      <div className="clothes-items__section">
        <p className="clothes-items__title">Your items</p>
        <button
          className="clothes-items__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        ) : (
          <p className="clothes-items__title">No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
