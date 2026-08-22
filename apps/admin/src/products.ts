export interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  status: "draft" | "active" | "archived";
  variants: number;
  inventory: number;
}

export interface CreateProductForm {
  title: string;
  handle: string;
  description: string;
  priceMinor: number;
  sku: string;
}

export function normalizeProductForm(form: CreateProductForm): CreateProductForm {
  const title = form.title.trim();
  const handle = form.handle.trim().toLowerCase();
  const sku = form.sku.trim().toUpperCase();
  if (!title) throw new Error("Product title is required");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(handle)) throw new Error("Handle must be URL-safe");
  if (!sku) throw new Error("SKU is required");
  if (!Number.isInteger(form.priceMinor) || form.priceMinor < 0) throw new Error("Price must be non-negative minor units");
  return { ...form, title, handle, sku };
}
