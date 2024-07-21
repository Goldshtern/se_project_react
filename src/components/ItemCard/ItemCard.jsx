import "./ItemCard.css";
function ItemCard({ item }) {
  return (
    <div>
      {
        <li className="card">
          <h2 className="card__name">{item.name}</h2>
          <img className="card__image" src={item.link} alt={item.name} />
        </li>
      }
    </div>
  );
}

export default ItemCard;
