import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChefHat, Leaf, Heart, Timer, Sparkles } from "lucide-react";
import { initialFoods } from "../data/initialFoods";
import FoodCard from "../components/FoodCard";

const perks = [
  { icon: <Leaf />, title: "Fresh ingredients", text: "Carefully selected produce and ingredients every day." },
  { icon: <ChefHat />, title: "Made to order", text: "Prepared fresh when you place your order." },
  { icon: <Heart />, title: "Made with care", text: "Comforting flavours and thoughtful service." }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> A little taste of happiness</span>
            <h1>Good food.<br /><em>Great mood.</em><br />Every single day.</h1>
            <p>From slow-cooked biryani to your favourite comfort bites, find something delicious at SpiceRoute.</p>
            <div className="hero-actions"><Link to="/menu" className="button button-primary">Explore our menu <ArrowRight size={18} /></Link><Link to="/about" className="button button-quiet">Our story <ArrowUpRight size={17} /></Link></div>
            <div className="hero-note"><span className="avatar-stack"><b>SR</b><b>♥</b><b>★</b></span><span><strong>Freshly prepared</strong><small>Good food for every occasion</small></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=90" alt="A colourful Indian meal served on a plate" /></div>
            <div className="floating-note"><span className="floating-icon"><Timer size={20} /></span><span><strong>Quick & delicious</strong><small>Made fresh, served happy</small></span></div>
            <div className="hero-sticker">Made with<br /><strong>♥</strong><br />in every bite</div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">A few favourites</span><h2>Popular on the table</h2><p>Customer favourites that always hit the spot.</p></div><Link to="/menu" className="text-link">View full menu <ArrowRight size={16} /></Link></div>
        <div className="food-grid">{initialFoods.filter((food) => food.popular).slice(0, 3).map((food) => <FoodCard key={food.id} food={food} />)}</div>
      </section>

      <section className="perks-section"><div className="container"><div className="section-heading centered"><div><span className="eyebrow">The SpiceRoute promise</span><h2>Simple ingredients. Serious flavour.</h2><p>We believe a great meal is about more than what is on the plate.</p></div></div><div className="perks-grid">{perks.map((perk) => <article className="perk-card" key={perk.title}><span className="perk-icon">{perk.icon}</span><h3>{perk.title}</h3><p>{perk.text}</p></article>)}</div></div></section>

      <section className="cta-section container"><div className="cta-card"><div><span className="eyebrow">Hungry yet?</span><h2>Your next favourite meal is waiting.</h2><p>Browse the menu and build your perfect order.</p><Link to="/menu" className="button button-light">Order something good <ArrowRight size={18} /></Link></div><div className="cta-emoji" aria-hidden="true">🍛</div></div></section>
    </>
  );
}
