import React, { useState } from "react";
import { buildVariant } from "@commerce-os/domain/variant.js";

export function VariantEditor({ tenantId, productId }: { tenantId: string; productId: string }) {
  const [sku, setSku] = useState(""); const [title, setTitle] = useState(""); const [price, setPrice] = useState(0); const [message, setMessage] = useState("");
  function save() { try { const variant = buildVariant({ tenantId, productId, sku, title, priceMinor: price, currency: "INR" }); setMessage(`Variant ${variant.sku} ready`); } catch (e) { setMessage(e instanceof Error ? e.message : "Invalid variant"); } }
  return <div className="variant-editor"><h2>Add variant</h2><label>Variant title<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Black / Medium" /></label><label>SKU<input value={sku} onChange={e => setSku(e.target.value)} placeholder="HOOD-BLK-M" /></label><label>Price in minor units<input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} /></label>{message && <p>{message}</p>}<button className="primary" onClick={save}>Save variant</button></div>;
}
