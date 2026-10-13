import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw, Salad } from "lucide-react";
import PageIntro from "../components/PageIntro";

export default function Discover() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  async function loadRecipes(signal) {
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("https://dummyjson.com/recipes?limit=8", { signal });
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      setRecipes(data.recipes || []);
      setStatus("success");
    } catch (err) {
      if (err.name === "AbortError") return;
      setError("Could not load recipes. Check your internet connection and try again.");
      setStatus("error");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadRecipes(controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className="container page-container">
      <PageIntro eyebrow="API integration" title="Discover more flavours" description="Explore delicious recipes, discover new flavours, and find inspiration for your next meal." />

    <div className="api-source">
      <span>
    <Salad size={18} />
    Fresh Recipe Inspiration
  </span>

  <button
    className="text-link"
    onClick={() => loadRecipes()}
  >
    <RefreshCw size={15} />
    Refresh Recipes
  </button>
</div>

{status === "loading" && (
  <div className="api-state">
    <span className="spinner" />
    <h2>Finding Recipe Inspiration…</h2>
    <p>Preparing something delicious for you.</p>
  </div>
)}

{status === "error" && (
  <div className="api-state">
    <h2>Recipes Are Unavailable</h2>
    <p>{error}</p>
    <button
      className="button button-primary"
      onClick={() => loadRecipes()}
    >
      Try Again
    </button>
  </div>
)}

{status === "success" && (
  <>
    <p className="results-line">
      {recipes.length} delicious recipes to inspire your next meal
    </p>

    <div className="food-grid api-grid">
      {recipes.map((recipe) => (
        <article
          className="food-card api-card"
          key={recipe.id}
        >
          <div className="food-image-wrap">
            <img
              className="food-image"
              src={recipe.image}
              alt={recipe.name}
              loading="lazy"
            />
            <span className="food-badge">
              Chef's Choice
            </span>
          </div>

          <div className="food-card-body">
            <h3 className="food-name">{recipe.name}</h3>

            <p className="food-description">
              {recipe.cuisine || "Mixed Cuisine"} ·{" "}
              {recipe.difficulty || "All Levels"}
            </p>

            <div className="food-meta">
              <span>⭐ {recipe.rating ?? "—"}</span>
              <span>
                {recipe.prepTimeMinutes ?? "—"} min prep
              </span>
            </div>

            <a
              className="text-link external-link"
              href={`https://dummyjson.com/recipes/${recipe.id}`}
              target="_blank"
              rel="noreferrer"
            >
              More Details <ExternalLink size={14} />
            </a>
          </div>
        </article>
      ))}
    </div>
  </>
)}
</div>
  );
}
