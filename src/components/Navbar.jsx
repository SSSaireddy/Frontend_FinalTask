import { Link, NavLink } from "react-router-dom";
import { ChefHat, ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
  { to: "/discover", label: "Discover" },
  { to: "/orders", label: "Orders" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><ChefHat size={23} /></span>
          <span>Spice<span className="brand-accent">Route</span><small>GOOD FOOD, GOOD MOOD</small></span>
        </Link>
        <button className="mobile-menu icon-button" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <MenuIcon />}
        </button>
        <nav className={`nav-links ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/cart" className="cart-nav" onClick={() => setOpen(false)} aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={19} /><span>Cart</span><b>{count}</b>
          </Link>
        </nav>
      </div>
    </header>
  );
}
