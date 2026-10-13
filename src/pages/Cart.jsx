import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../features/cart/cartSlice";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "../context/ToastContext";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [orders, setOrders] = useLocalStorage("spiceroute-orders", []);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 499 || subtotal === 0 ? 0 : 30;

  function submitOrder(event) {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 10) nextErrors.address = "Enter a delivery address of at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const order = { id: `SR${Date.now().toString().slice(-7)}`, createdAt: new Date().toISOString(), customer: form, items, total: subtotal + delivery, status: "Received" };
    setOrders((previous) => [order, ...previous]);
    dispatch(clearCart());
    setShowCheckout(false);
    showToast(`Demo order ${order.id} placed successfully`);
    navigate("/orders");
  }

  if (!items.length) return <div className="container page-container"><EmptyState title="Your cart is taking a break" description="Add a few favourites from our menu and they will appear here." /></div>;

  return (
    <div className="container page-container">
      <div className="page-intro compact-intro"><span className="eyebrow">Almost there</span><h1>Your cart</h1><p>Check your items before placing a demo order.</p></div>
      <div className="cart-layout"><section className="cart-items"><div className="cart-section-heading"><h2>Your items <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2><button className="text-link danger-link" onClick={() => dispatch(clearCart())}>Clear cart</button></div>
        {items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><Link to={`/menu/${item.id}`} className="food-name">{item.name}</Link><span className="muted">{item.category}</span><strong>₹{item.price * item.quantity}</strong><div className="quantity-control"><button aria-label={`Decrease ${item.name}`} onClick={() => dispatch(decreaseQuantity(item.id))}><Minus size={14}/></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name}`} onClick={() => dispatch(increaseQuantity(item.id))}><Plus size={14}/></button></div></div><button className="icon-button remove-button" aria-label={`Remove ${item.name}`} onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={17}/></button></article>)}
        <Link to="/menu" className="back-link"><ArrowRight size={16} /> Add more dishes</Link>
      </section>
      <aside className="order-summary"><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div><div className="summary-row"><span>Delivery</span><span>{delivery ? `₹${delivery}` : "Free"}</span></div><div className="summary-row summary-total"><strong>Total</strong><strong>₹{subtotal + delivery}</strong></div><p className="summary-note">{subtotal < 500 ? `Add ₹${500 - subtotal} more for free delivery.` : "You unlocked free delivery."}</p><button className="button button-primary button-full" onClick={() => setShowCheckout(!showCheckout)}>{showCheckout ? "Hide checkout" : "Continue to checkout"} <ArrowRight size={17}/></button><p className="demo-disclaimer"><ShoppingBag size={14}/> Demo checkout only. No payment is collected.</p>
        {showCheckout && <form className="checkout-form" onSubmit={submitOrder} noValidate><h3>Delivery details</h3><label>Full name<input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" /></label>{errors.name && <small className="field-error">{errors.name}</small>}<label>Mobile number<input inputMode="numeric" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} placeholder="10-digit mobile number" /></label>{errors.phone && <small className="field-error">{errors.phone}</small>}<label>Delivery address<textarea rows="3" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} placeholder="House no., street, area..." /></label>{errors.address && <small className="field-error">{errors.address}</small>}<button className="button button-primary button-full" type="submit">Place demo order · ₹{subtotal + delivery}</button></form>}
      </aside></div>
    </div>
  );
}
