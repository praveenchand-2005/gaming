import { describe, expect, it } from "vitest";
import { adjustAvailable, reserve, type InventoryLevel } from "./inventory.js";

const level: InventoryLevel = { tenantId: "t1", variantId: "v1", locationId: "l1", available: 10, reserved: 2 };

describe("inventory", () => {
  it("adjusts available stock", () => expect(adjustAvailable(level, 5).available).toBe(15));
  it("rejects negative stock", () => expect(() => adjustAvailable(level, -11)).toThrow());
  it("reserves available stock", () => { const next = reserve(level, 3); expect(next.available).toBe(7); expect(next.reserved).toBe(5); });
  it("rejects reservations larger than availability", () => expect(() => reserve(level, 11)).toThrow());
});
