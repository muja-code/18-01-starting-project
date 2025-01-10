import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const httpConfig = {};

export default function Meals({ onAddCart }) {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', httpConfig, []);

  if (isLoading) {
    return <p className="center">Meals fetching...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals." message={error.message} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} onAddCart={onAddCart} />
      ))}
    </ul>
  );
}
