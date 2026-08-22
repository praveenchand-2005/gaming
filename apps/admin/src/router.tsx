import React, { useState } from "react";
import { ProductsView } from "./products-view.js";
import { OrdersView } from "./orders-view.js";
import { InventoryView } from "./inventory-view.js";

export type AdminRoute = "command" | "products" | "orders" | "inventory";

const routeByNav: Record<string, AdminRoute> = {
  "AI Command Center": "command", Products: "products", Orders: "orders", Inventory: "inventory",
};

export function AdminRouter() {
  const [route, setRoute] = useState<AdminRoute>("command");
  const navigate = (label: string) => { const next = routeByNav[label]; if (next) setRoute(next); };
  return <>{route === "products" && <ProductsView />} {route === "orders" && <OrdersView />} {route === "inventory" && <InventoryView />} {route === "command" && <div className="route-placeholder"><h2>AI Command Center</h2><p>Select a commerce area from the navigation.</p></div>}<button className="route-test" onClick={() => navigate("Products")}>Open Products</button></>;
}
