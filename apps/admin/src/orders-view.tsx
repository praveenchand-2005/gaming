import React from "react";

const orders = [
  { number: "#10482", customer: "Arjun Kumar", date: "Today, 20:41", total: "₹3,498", status: "paid", items: 2 },
  { number: "#10481", customer: "Priya S.", date: "Today, 20:18", total: "₹1,999", status: "fulfilled", items: 1 },
  { number: "#10480", customer: "Rahul M.", date: "Today, 19:52", total: "₹5,297", status: "pending", items: 3 },
];

export function OrdersView() {
  return <section className="products-view"><div className="page-head"><div><span className="eyebrow">COMMERCE</span><h1>Orders</h1><p>Track payment, fulfillment and customer orders.</p></div><button className="command">Export</button></div><div className="product-toolbar"><input placeholder="Search orders" /><select defaultValue="all"><option value="all">All status</option><option>Pending</option><option>Paid</option><option>Fulfilled</option></select></div><div className="product-table"><div className="table-row table-header"><span>Order</span><span>Customer</span><span>Total</span><span>Status</span></div>{orders.map(order => <div className="table-row" key={order.number}><div><b>{order.number}</b><small>{order.date} · {order.items} items</small></div><span>{order.customer}</span><span>{order.total}</span><span className={`badge ${order.status}`}>{order.status}</span></div>)}</div></section>;
}
