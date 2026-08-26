import React, { useState } from "react";

interface Level { variant: string; sku: string; location: string; available: number; reserved: number; }
const initial: Level[] = [
  { variant: "Everyday Hoodie / Black / M", sku: "HOOD-BLK-M", location: "Main Warehouse", available: 42, reserved: 6 },
  { variant: "Essential Tee / White / L", sku: "TEE-WHT-L", location: "Main Warehouse", available: 118, reserved: 12 },
  { variant: "Canvas Cap / Black", sku: "CAP-BLK", location: "Store #1", available: 8, reserved: 2 },
];

export function InventoryView() {
  const [levels, setLevels] = useState(initial);
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState(0);
  const adjust = (delta: number) => { setLevels(xs => xs.map((x, i) => i === selected ? { ...x, available: Math.max(0, x.available + delta) } : x)); setAmount(0); };
  return <section className="products-view"><div className="page-head"><div><span className="eyebrow">OPERATIONS</span><h1>Inventory</h1><p>Track availability, reservations and stock across locations.</p></div><button className="command">Transfer stock</button></div><div className="product-table"><div className="table-row table-header"><span>Variant</span><span>SKU</span><span>Location</span><span>Available</span></div>{levels.map((level, i) => <div className="table-row" key={level.sku}><div><b>{level.variant}</b><small>{level.reserved} reserved</small></div><span>{level.sku}</span><span>{level.location}</span><span className={level.available < 10 ? "low-stock" : ""}>{level.available}</span></div>)}</div><div className="inventory-adjust"><div><span className="eyebrow">QUICK ADJUSTMENT</span><h2>{levels[selected].variant}</h2><p>Current available: <b>{levels[selected].available}</b></p></div><select value={selected} onChange={e => setSelected(Number(e.target.value))}>{levels.map((x, i) => <option key={x.sku} value={i}>{x.sku}</option>)}</select><input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} /><button onClick={() => adjust(amount)}>Add</button><button onClick={() => adjust(-amount)}>Remove</button></div></section>;
}
