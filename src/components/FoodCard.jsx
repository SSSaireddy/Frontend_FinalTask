import { Link } from "react-router-dom";
import { Star, Clock, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useToast } from "../context/ToastContext";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  function handleAdd() {
    dispatch(addToCart(food));
    showToast(`${food.name} added to your cart`);
  }

  return (
    <article className="food-card">
      <Link to={`/menu/${food.id}`} className="food-image-wrap" aria-label={`View ${food.name}`}>
        <img className="food-image" src={food.image} alt={food.name} loading="lazy" />
        {food.popular && <span className="food-badge">Bestseller</span>}
        <span className={`veg-dot ${food.vegetarian ? "veg" : "nonveg"}`} title={food.vegetarian ? "Vegetarian" : "Non-vegetarian"} />
      </Link>
      <div className="food-card-body">
        <div className="food-title-row"><Link to={`/menu/${food.id}`} className="food-name">{food.name}</Link><span className="rating"><Star size={14} fill="currentColor" /> {food.rating}</span></div>
        <p className="food-description">{food.description}</p>
        <div className="food-meta"><span><Clock size={14} /> {food.prepTime}</span><strong>₹{food.price}</strong></div>
        <div className="food-actions"><Link to={`/menu/${food.id}`} className="text-link">View details</Link><button className="add-button" onClick={handleAdd}><Plus size={17} /> Add</button></div>
      </div>
    </article>
  );
}
