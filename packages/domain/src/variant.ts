export interface ProductVariantDraft {
  tenantId: string;
  productId: string;
  sku: string;
  title: string;
  priceMinor: number;
  currency: string;
  inventoryTracked?: boolean;
}

export function buildVariant(input: ProductVariantDraft) {
  const sku = input.sku.trim().toUpperCase();
  const title = input.title.trim();
  if (!sku) throw new Error("SKU is required");
  if (!title) throw new Error("Variant title is required");
  if (!Number.isInteger(input.priceMinor) || input.priceMinor < 0) throw new Error("Price must be non-negative minor units");
  if (!/^[A-Z0-9][A-Z0-9._-]*$/.test(sku)) throw new Error("SKU contains invalid characters");
  return { id: crypto.randomUUID(), ...input, sku, title, currency: input.currency.toUpperCase(), inventoryTracked: input.inventoryTracked ?? true };
}
