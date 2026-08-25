"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../AdminContext";
import { api } from "../api";

interface Color {
  name: string;
  hex: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  section: string;
  colors: Color[];
  rating: number;
  reviews: number;
  inStock: boolean;
  createdAt: string;
}

const emptyProduct = {
  name: "",
  price: 0,
  originalPrice: 0,
  image: "",
  description: "",
  section: "new-arrivals",
  colors: [{ name: "", hex: "#000000", image: "" }],
  inStock: true,
};

export default function ProductsPage() {
  const { user, loading: authLoading } = useAdmin();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/admin/login");
  }, [user, authLoading, router]);

  const fetchProducts = () => {
    api.get("/api/products").then((data) => {
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const filtered = filter === "all" ? products : products.filter((p) => p.section === filter);

  const openCreate = () => {
    setEditId(null);
    setForm({ ...emptyProduct, colors: [{ name: "", hex: "#000000", image: "" }] });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      image: p.image,
      description: p.description || "",
      section: p.section,
      colors: p.colors.length > 0 ? p.colors : [{ name: "", hex: "#000000", image: "" }],
      inStock: p.inStock,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, originalPrice: form.originalPrice || undefined };
      if (editId) {
        await api.put(`/api/products/${editId}`, body);
      } else {
        await api.post("/api/products", body);
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const addColor = () => setForm({ ...form, colors: [...form.colors, { name: "", hex: "#000000", image: "" }] });
  const removeColor = (i: number) => setForm({ ...form, colors: form.colors.filter((_, idx) => idx !== i) });
  const updateColor = (i: number, field: string, value: string) => {
    const colors = [...form.colors];
    (colors[i] as Record<string, string>)[field] = value;
    setForm({ ...form, colors });
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-burgundy border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-semibold text-burgundy">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} total products</p>
        </div>
        <button onClick={openCreate} className="bg-burgundy hover:bg-wine text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 active:scale-[0.98] self-start">
          + Add Product
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "new-arrivals", "best-sellers"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              filter === s ? "bg-burgundy text-white" : "bg-white text-burgundy border border-cream hover:border-burgundy/30"
            }`}
          >
            {s === "all" ? "All" : s === "new-arrivals" ? "New Arrivals" : "Best Sellers"}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-cream p-10 text-center text-gray-400 text-sm">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl border border-cream overflow-hidden group">
              <div className="aspect-square bg-cream/30 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 right-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">{p.section}</p>
                <h3 className="text-sm font-semibold text-burgundy line-clamp-1">{p.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-gold">{p.price.toLocaleString()} DZD</span>
                  {p.originalPrice ? (
                    <span className="text-xs text-gray-400 line-through">{p.originalPrice.toLocaleString()} DZD</span>
                  ) : null}
                </div>
                <div className="flex gap-1 mt-2">
                  {p.colors.map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: c.hex }} />
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(p)} className="flex-1 text-xs font-semibold border border-cream rounded-lg py-2 hover:border-gold hover:text-gold transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="flex-1 text-xs font-semibold border border-red-200 text-red-500 rounded-lg py-2 hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/45 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 border border-gold/20">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-cream flex items-center justify-between">
              <h3 className="font-serif-brand text-xl font-semibold text-burgundy">
                {editId ? "Edit Product" : "Add Product"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-burgundy transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Price (DZD)</label>
                  <input required type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Original Price</label>
                  <input type="number" min="0" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Image URL</label>
                <input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/assets/products/photo1.jpeg" className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1.5">Section</label>
                <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="w-full border border-cream rounded-xl p-3 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy">
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="best-sellers">Best Sellers</option>
                </select>
              </div>

              {/* Colors */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Colors</label>
                  <button type="button" onClick={addColor} className="text-xs font-semibold text-gold hover:text-gold-dark transition-colors">+ Add Color</button>
                </div>
                <div className="flex flex-col gap-3">
                  {form.colors.map((c, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <input value={c.name} onChange={(e) => updateColor(i, "name", e.target.value)} placeholder="Color name" className="flex-1 border border-cream rounded-lg p-2.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                      <input type="color" value={c.hex} onChange={(e) => updateColor(i, "hex", e.target.value)} className="w-10 h-10 rounded-lg border border-cream cursor-pointer shrink-0" />
                      <input value={c.image} onChange={(e) => updateColor(i, "image", e.target.value)} placeholder="Image URL" className="flex-1 border border-cream rounded-lg p-2.5 outline-none focus:border-gold transition-colors bg-cream/20 text-sm text-burgundy" />
                      {form.colors.length > 1 && (
                        <button type="button" onClick={() => removeColor(i)} className="p-2 text-red-400 hover:text-red-600 transition-colors shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" id="inStock" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-4 h-4 accent-burgundy rounded" />
                <label htmlFor="inStock" className="text-sm text-burgundy">In Stock</label>
              </div>

              <button type="submit" disabled={saving} className="w-full bg-burgundy hover:bg-wine text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 mt-2">
                {saving ? "Saving..." : editId ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
