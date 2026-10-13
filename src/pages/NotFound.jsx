import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return <div className="container page-container"><div className="empty-state"><span className="empty-icon"><Compass size={30}/></span><h1>Page not found</h1><p>The page you are looking for does not exist.</p><Link to="/" className="button button-primary">Go home</Link></div></div>;
}
