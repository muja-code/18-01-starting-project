import { useEffect, useState } from 'react';
import MealItem from './MealItem';

export default function Meals({ onAddCart }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      fetch('http://localhost:3000/meals')
        .then((response) => response.json())
        .then((data) => setMeals(data));
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} onAddCart={onAddCart} />
      ))}
    </ul>
  );
}
