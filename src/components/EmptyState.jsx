import { Link } from "react-router-dom";
import { UtensilsCrossed } from "lucide-react";

export default function EmptyState({ title, description, action = "Explore menu", to = "/menu" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><UtensilsCrossed size={27} /></span>
      <h2>{title}</h2><p>{description}</p><Link className="button button-primary" to={to}>{action}</Link>
    </div>
  );
}
