import { useState } from "react";
import { Pencil, Plus, Trash2, X, Save, ShieldAlert } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { categories, initialFoods } from "../data/initialFoods";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "../context/ToastContext";

const blankFood = { name: "", category: "Biryani", price: "", rating: "4.5", prepTime: "15-20 min", vegetarian: true, popular: false, description: "", image: "" };

export default function Admin() {
  const [foods, setFoods] = useLocalStorage("spiceroute-foods", initialFoods);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankFood);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  function startEdit(food) {
    setEditingId(food.id);
    setForm({ ...food, price: String(food.price), rating: String(food.rating) });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(blankFood);
    setErrors({});
  }

  function submitFood(event) {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 3) nextErrors.name = "Dish name must be at least 3 characters.";
    if (!form.price || Number(form.price) <= 0) nextErrors.price = "Enter a price greater than zero.";
    if (form.description.trim().length < 10) nextErrors.description = "Description must be at least 10 characters.";
    if (form.image.trim() && !/^https?:\/\/.+/i.test(form.image.trim())) nextErrors.image = "Image must be a valid http(s) URL.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const food = { ...form, id: editingId || `food-${Date.now()}`, price: Number(form.price), rating: Number(form.rating) || 4.5, image: form.image.trim() || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85" };
    setFoods((previous) => editingId ? previous.map((item) => item.id === editingId ? food : item) : [food, ...previous]);
    showToast(editingId ? "Dish updated" : "Dish added to menu");
    resetForm();
  }

  function deleteFood(food) {
    if (!window.confirm(`Delete "${food.name}" from the demo menu?`)) return;
    setFoods((previous) => previous.filter((item) => item.id !== food.id));
    if (editingId === food.id) resetForm();
    showToast("Dish deleted");
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({ ...previous, [name]: type === "checkbox" ? checked : value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }

  return (
    <div className="container page-container">
      <PageIntro eyebrow="Restaurant management" title="Menu admin" description="Create, view, update and delete dishes. Changes are saved in this browser." />
      <div className="admin-warning"><ShieldAlert size={19}/><p>Demo admin only. There is no login or permission security. Do not use this pattern for a real business without a backend.</p></div>
      <div className="admin-layout"><form className="admin-form" onSubmit={submitFood} noValidate><div className="form-title-row"><h2>{editingId ? "Edit dish" : "Add a dish"}</h2>{editingId && <button type="button" className="icon-button" onClick={resetForm} aria-label="Cancel editing"><X/></button>}</div>
        <label>Dish name<input name="name" value={form.name} onChange={updateField} placeholder="e.g. Veg Pulao" /></label>{errors.name && <small className="field-error">{errors.name}</small>}
        <div className="form-two-col"><label>Category<select name="category" value={form.category} onChange={updateField}>{categories.filter((c)=>c!=="All").map((c)=><option key={c}>{c}</option>)}</select></label><label>Price (₹)<input name="price" type="number" min="1" value={form.price} onChange={updateField} placeholder="199" /></label></div>{errors.price && <small className="field-error">{errors.price}</small>}
        <label>Description<textarea name="description" rows="3" value={form.description} onChange={updateField} placeholder="Describe the dish..." /></label>{errors.description && <small className="field-error">{errors.description}</small>}
        <label>Image URL (optional)<input name="image" value={form.image} onChange={updateField} placeholder="https://..." /></label>{errors.image && <small className="field-error">{errors.image}</small>}
        <label>Preparation time<input name="prepTime" value={form.prepTime} onChange={updateField} placeholder="15-20 min" /></label>
        <div className="checkbox-row"><label><input type="checkbox" name="vegetarian" checked={form.vegetarian} onChange={updateField}/> Vegetarian</label><label><input type="checkbox" name="popular" checked={form.popular} onChange={updateField}/> Bestseller</label></div>
        <button className="button button-primary button-full" type="submit">{editingId ? <><Save size={17}/> Save changes</> : <><Plus size={17}/> Add dish</>}</button>
      </form>
      <section className="admin-list"><div className="admin-list-heading"><h2>Current menu</h2><span>{foods.length} items</span></div>{foods.map((food)=><article className="admin-food-row" key={food.id}><img src={food.image} alt="" /><div className="admin-food-info"><strong>{food.name}</strong><span>{food.category} · ₹{food.price}</span></div><button className="icon-button" aria-label={`Edit ${food.name}`} onClick={()=>startEdit(food)}><Pencil size={16}/></button><button className="icon-button danger-icon" aria-label={`Delete ${food.name}`} onClick={()=>deleteFood(food)}><Trash2 size={16}/></button></article>)}</section></div>
    </div>
  );
}
