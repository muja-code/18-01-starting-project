import reactFoodLogo from '../assets/logo.jpg';

export default function Header({ cartItemCount, onOpenCart }) {
  return (
    <header id="main-header">
      <div id="title">
        <img src={reactFoodLogo} alt="react food logo image." />
        <h1>REACT FOOD</h1>
      </div>
      <button type="button" className="button" onClick={onOpenCart}>
        Cart({cartItemCount})
      </button>
    </header>
  );
}
