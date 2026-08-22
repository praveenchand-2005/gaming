import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const nav = ["AI Command Center", "Overview", "Orders", "Products", "Inventory", "Customers", "Marketing", "Sales Channels", "Website", "POS", "B2B", "Suppliers", "Finance", "Analytics", "Automations", "AI Employees", "Settings"];

function App() {
  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">C</span><span>Commerce OS</span></div>
      <div className="store">Demo Store <span>⌄</span></div>
      <nav>{nav.map((item, index) => <button className={index === 0 ? "nav active" : "nav"} key={item}>{item}</button>)}</nav>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">AI COMMAND CENTER</span><h1>Good evening</h1></div><button className="command">Ask Commerce OS <kbd>⌘ K</kbd></button></header>
      <section className="hero"><div><span className="eyebrow">BUSINESS HEALTH</span><div className="score">82<span>/100</span></div><p>Your store is healthy. 3 actions could improve projected profit this week.</p></div><button className="primary">Review actions</button></section>
      <section className="grid">
        <article><span className="label">Revenue</span><strong>₹4.82L</strong><small>+12.4% vs last week</small></article>
        <article><span className="label">Orders</span><strong>1,284</strong><small>+8.7% vs last week</small></article>
        <article><span className="label">Conversion</span><strong>3.84%</strong><small>+0.42 pts</small></article>
        <article><span className="label">Profit</span><strong>₹1.31L</strong><small>27.2% margin</small></article>
      </section>
      <section className="content"><div className="panel"><div className="panel-head"><h2>Needs attention</h2><span>3 actions</span></div><div className="action"><div><b>Inventory risk</b><p>Product A may stock out in 4 days.</p></div><button>Reorder</button></div><div className="action"><div><b>Conversion opportunity</b><p>Mobile product page conversion fell 8%.</p></div><button>Investigate</button></div><div className="action"><div><b>Abandoned carts</b><p>42 carts could recover approximately ₹31,400.</p></div><button>Review</button></div></div><div className="panel"><div className="panel-head"><h2>AI employees</h2><span>Active</span></div>{["Sales Agent", "Inventory Agent", "Marketing Agent", "Finance Agent"].map(x => <div className="agent" key={x}><span className="dot" />{x}<span className="running">Running</span></div>)}</div></section>
    </main>
  </div>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
