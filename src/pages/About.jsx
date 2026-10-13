import { ChefHat, Heart, Leaf, Utensils } from "lucide-react";
import PageIntro from "../components/PageIntro";

export default function About() {
  return (
    <div className="container page-container">
      <PageIntro eyebrow="A little about us" title="Food tastes better when it brings us together." description="SpiceRoute is a restaurant concept built around familiar flavours, fresh preparation and the joy of sharing a good meal." />
      <div className="about-feature"><div className="about-image"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=85" alt="Warm restaurant dining space" /></div><div className="about-copy"><span className="eyebrow">Our story</span><h2>Rooted in flavour. Made for everyone.</h2><p>We started with one simple idea: make the food people love, serve it with care, and create a welcoming place for everyone at the table.</p><p>From comforting South Indian classics to crowd-favourite biryanis and desserts, our menu celebrates the flavours that make everyday meals memorable.</p></div></div>
      <div className="values-grid">{[{icon:<ChefHat/>,title:"Cooked with care",text:"Every dish is prepared with attention to flavour and consistency."},{icon:<Leaf/>,title:"Fresh by choice",text:"We aim to use quality ingredients and prepare dishes to order."},{icon:<Heart/>,title:"People first",text:"Friendly service and a welcoming dining experience matter to us."},{icon:<Utensils/>,title:"Something for all",text:"A varied menu offers vegetarian and non-vegetarian options."}].map((value)=><article className="value-card" key={value.title}><span className="perk-icon">{value.icon}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div>
      <div className="notice-box"><strong>Project demo note</strong><p>SpiceRoute is a fictional restaurant concept created for a React training assignment. Address, menu and contact details are sample content.</p></div>
    </div>
  );
}
