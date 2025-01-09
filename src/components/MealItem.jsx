export default function MealItem({ meal, onAddCart }) {
  const imageUrl = `http://localhost:3000/${meal.image}`;
  return (
    <li className="meal-item">
      <article>
        <img src={imageUrl} alt={meal.name} />
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{meal.price}</p>
        <p className="meal-item-description">{meal.description}</p>
        <div className="meal-item-actions">
          <button
            type="button"
            className="button"
            onClick={() => {
              onAddCart(meal.id, meal.name, meal.price);
            }}
          >
            Add To Cart
          </button>
        </div>
      </article>
    </li>
  );
}
