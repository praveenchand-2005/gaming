export const permissions = {
  productsRead: "products:read",
  productsWrite: "products:write",
  ordersRead: "orders:read",
  ordersWrite: "orders:write",
  inventoryRead: "inventory:read",
  inventoryWrite: "inventory:write",
  customersRead: "customers:read",
  analyticsRead: "analytics:read",
  aiExecute: "ai:execute",
} as const;

export const rolePermissions: Record<string, readonly string[]> = {
  owner: ["*"],
  admin: Object.values(permissions),
  manager: [permissions.productsRead, permissions.productsWrite, permissions.ordersRead, permissions.ordersWrite, permissions.inventoryRead, permissions.inventoryWrite, permissions.customersRead, permissions.analyticsRead, permissions.aiExecute],
  staff: [permissions.productsRead, permissions.ordersRead, permissions.ordersWrite, permissions.inventoryRead, permissions.inventoryWrite, permissions.customersRead],
  viewer: [permissions.productsRead, permissions.ordersRead, permissions.inventoryRead, permissions.customersRead, permissions.analyticsRead],
};
