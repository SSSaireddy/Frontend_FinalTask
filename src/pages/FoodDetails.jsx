import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Star, CheckCircle2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useToast } from "../context/ToastContext";
import { initialFoods } from "../data/initialFoods";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function FoodDetails() {
  const { id } = useParams();
  const [foods] = useLocalStorage("spiceroute-foods", initialFoods);
  const food = foods.find((item) => item.id === id);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  if (!food) return <div className="container page-container"><div className="empty-state"><h2>Dish not found</h2><p>This menu item may have been removed.</p><Link className="button button-primary" to="/menu">Back to menu</Link></div></div>;

  return (
    <div className="container page-container">
      <Link to="/menu" className="back-link"><ArrowLeft size={17} /> Back to menu</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={food.image} alt={food.name} /></div>
        <div className="detail-copy"><span className="eyebrow">{food.category}</span><h1>{food.name}</h1><div className="detail-rating"><span><Star size={16} fill="currentColor" /> {food.rating} rating</span><span><Clock size={16} /> {food.prepTime}</span></div><p>{food.description}</p><div className="detail-benefits"><span><CheckCircle2 size={17} /> Prepared fresh to order</span><span><CheckCircle2 size={17} /> Quality ingredients</span></div><div className="detail-buy"><strong>₹{food.price}</strong><button className="button button-primary" onClick={() => { dispatch(addToCart(food)); showToast(`${food.name} added to your cart`); }}>Add to cart</button></div></div>
      </div>
    </div>
  );
}
