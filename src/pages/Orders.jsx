import { Link } from "react-router-dom";
import { ClipboardList, Clock3, PackageCheck } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import EmptyState from "../components/EmptyState";
import PageIntro from "../components/PageIntro";

export default function Orders() {
  const [orders, setOrders] = useLocalStorage("spiceroute-orders", []);
  function cancelDemoOrder(id) {
    setOrders((previous) => previous.map((order) => order.id === id ? { ...order, status: "Cancelled" } : order));
  }

  return (
    <div className="container page-container">
      <PageIntro eyebrow="Your food journey" title="Order history" description="Your recent demo orders will appear here on this browser." />
      {!orders.length ? <EmptyState title="No orders yet" description="Your next delicious meal is just a few clicks away." /> : <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div className="order-card-top"><div><span className="muted">Order ID</span><h3>{order.id}</h3></div><span className={`status-pill ${order.status === "Cancelled" ? "status-cancelled" : "status-received"}`}>{order.status}</span></div><div className="order-card-meta"><span><Clock3 size={15}/> {new Date(order.createdAt).toLocaleString()}</span><span><PackageCheck size={15}/> {order.items.reduce((sum,item)=>sum+item.quantity,0)} items</span></div><div className="order-card-foods">{order.items.map((item)=><span key={item.id}>{item.name} × {item.quantity}</span>)}</div><div className="order-card-bottom"><strong>Total ₹{order.total}</strong>{order.status !== "Cancelled" && <button className="text-link danger-link" onClick={()=>cancelDemoOrder(order.id)}>Cancel demo order</button>}</div></article>)}</div>}
      <div className="notice-box"><ClipboardList size={18}/><p>Order status and history are simulated and stored in this browser only. This is not a live restaurant ordering service.</p></div>
    </div>
  );
}
