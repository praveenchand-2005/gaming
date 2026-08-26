import React, { useState } from "react";
import { normalizeProductForm, type AdminProduct, type CreateProductForm } from "./products.js";

const initialProducts: AdminProduct[] = [
  { id: "p-1", title: "Everyday Hoodie", handle: "everyday-hoodie", status: "active", variants: 3, inventory: 128 },
  { id: "p-2", title: "Essential Tee", handle: "essential-tee", status: "active", variants: 5, inventory: 342 },
  { id: "p-3", title: "Canvas Cap", handle: "canvas-cap", status: "draft", variants: 2, inventory: 0 },
];

export function ProductsView() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateProductForm>({ title: "", handle: "", description: "", priceMinor: 0, sku: "" });
  const [error, setError] = useState("");

  function createProduct() {
    try {
      const value = normalizeProductForm(form);
      setProducts(current => [{ id: crypto.randomUUID(), title: value.title, handle: value.handle, status: "draft", variants: 1, inventory: 0 }, ...current]);
      setForm({ title: "", handle: "", description: "", priceMinor: 0, sku: "" });
      setError(""); setOpen(false);
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid product"); }
  }

  return <section className="products-view">
    <div className="page-head"><div><span className="eyebrow">CATALOG</span><h1>Products</h1><p>Manage products, variants, pricing and inventory.</p></div><button className="primary" onClick={() => setOpen(true)}>+ Add product</button></div>
    <div className="product-toolbar"><input placeholder="Search products" /><select defaultValue="all"><option value="all">All status</option><option value="active">Active</option><option value="draft">Draft</option></select></div>
    <div className="product-table"><div className="table-row table-header"><span>Product</span><span>Status</span><span>Variants</span><span>Inventory</span></div>{products.map(product => <div className="table-row" key={product.id}><div><b>{product.title}</b><small>{product.handle}</small></div><span className={`badge ${product.status}`}>{product.status}</span><span>{product.variants}</span><span>{product.inventory}</span></div>)}</div>
    {open && <div className="modal-backdrop"><div className="modal"><div className="modal-head"><h2>Create product</h2><button onClick={() => setOpen(false)}>×</button></div><label>Title<input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Product name" /></label><label>Handle<input value={form.handle} onChange={e => setForm({ ...form, handle: e.target.value })} placeholder="product-name" /></label><div className="two"><label>SKU<input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="SKU-001" /></label><label>Price (minor units)<input type="number" value={form.priceMinor} onChange={e => setForm({ ...form, priceMinor: Number(e.target.value) })} /></label></div><label>Description<textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label>{error && <div className="error">{error}</div>}<div className="modal-actions"><button onClick={() => setOpen(false)}>Cancel</button><button className="primary" onClick={createProduct}>Create draft</button></div></div></div>}
  </section>;
}
