import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PageIntro from "../components/PageIntro";
import FoodCard from "../components/FoodCard";
import { categories, initialFoods } from "../data/initialFoods";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods] = useLocalStorage("spiceroute-foods", initialFoods);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [diet, setDiet] = useState("All");
  const searchRef = useRef(null);

  useEffect(() => {
    const next = {};
    if (search.trim()) next.q = search.trim();
    if (category !== "All") next.category = category;
    setSearchParams(next, { replace: true });
  }, [search, category, setSearchParams]);

  const filteredFoods = useMemo(() => foods.filter((food) => {
    const matchesSearch = `${food.name} ${food.description} ${food.category}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;
    const matchesDiet = diet === "All" || (diet === "Veg" ? food.vegetarian : !food.vegetarian);
    return matchesSearch && matchesCategory && matchesDiet;
  }), [foods, search, category, diet]);

  return (
    <div className="container page-container">
      <PageIntro eyebrow="Made fresh for you" title="Explore our menu" description="Comfort food, bold flavours and little treats. Find your next favourite." />
      <div className="menu-toolbar">
        <label className="search-box"><Search size={19} /><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dishes or ingredients..." aria-label="Search dishes" />{search && <button className="icon-button" onClick={() => { setSearch(""); searchRef.current?.focus(); }} aria-label="Clear search"><X size={16} /></button>}</label>
        <label className="diet-select"><SlidersHorizontal size={17} /><select value={diet} onChange={(event) => setDiet(event.target.value)} aria-label="Filter by dietary preference"><option>All</option><option>Veg</option><option>Non-veg</option></select></label>
      </div>
      <div className="category-pills" aria-label="Food categories">{categories.map((item) => <button key={item} className={`category-pill ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="results-line"><span>{filteredFoods.length} dishes to explore</span><span>Prices in Indian Rupees (₹)</span></div>
      {filteredFoods.length ? <div className="food-grid">{filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)}</div> : <div className="empty-state"><span className="empty-icon"><Search size={26} /></span><h2>No dishes found</h2><p>Try a different search term or change the filters.</p><button className="button button-primary" onClick={() => { setSearch(""); setCategory("All"); setDiet("All"); }}>Clear filters</button></div>}
    </div>
  );
}
