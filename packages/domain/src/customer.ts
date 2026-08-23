export interface CustomerDraft {
  tenantId: string;
  storeId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export function buildCustomer(input: CustomerDraft) {
  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes("@")) throw new Error("Valid customer email is required");
  return { id: crypto.randomUUID(), tenantId: input.tenantId, storeId: input.storeId, email, firstName: input.firstName?.trim(), lastName: input.lastName?.trim(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
}
