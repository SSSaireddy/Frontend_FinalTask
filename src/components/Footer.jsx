import { Link } from "react-router-dom";
import { ChefHat, MapPin, Clock, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand"><span className="brand-mark"><ChefHat size={22} /></span><span>Spice<span className="brand-accent">Route</span><small>GOOD FOOD, GOOD MOOD</small></span></Link>
          <p>Freshly prepared favourites, warm hospitality, and little moments worth sharing.</p>
        </div>
        <div><h4>Explore</h4><Link to="/menu">Our Menu</Link><Link to="/about">Our Story</Link><Link to="/orders">My Orders</Link></div>
        <div><h4>Visit us</h4><p><MapPin size={15} /> 12 Food Street, Tirupati</p><p><Clock size={15} /> Daily, 11 AM – 10 PM</p><p><Phone size={15} /> +91 98765 43210</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} SpiceRoute Restaurant</span><span>Made for a React learning project</span></div>
    </footer>
  );
}
