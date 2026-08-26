import type { IncomingMessage, ServerResponse } from "node:http";
import { readJson } from "./json-body.js";
import { createProductEndpoints } from "./product-endpoints.js";

export async function dispatchCatalog(request: IncomingMessage, response: ServerResponse, endpoints: ReturnType<typeof createProductEndpoints>): Promise<boolean> {
  const headers = { "x-tenant-id": request.headers["x-tenant-id"] as string|undefined, "x-user-id": request.headers["x-user-id"] as string|undefined, "x-user-role": request.headers["x-user-role"] as string|undefined };
  const parts = (request.url ?? "").split("/").filter(Boolean);
  try {
    if (request.method === "GET" && parts[0] === "products" && parts.length === 2) return response.statusCode=200, response.end(JSON.stringify(await endpoints.listProducts(headers, parts[1]))), true;
    if (request.method === "GET" && parts[0] === "products" && parts[2] === "variants") return response.statusCode=200, response.end(JSON.stringify(await endpoints.listVariants(headers, parts[1]))), true;
    if (request.method === "POST" && parts[0] === "variants") return response.statusCode=201, response.end(JSON.stringify(await endpoints.createVariant(headers, await readJson(request)))), true;
    if (request.method === "POST" && parts[0] === "inventory" && parts[1] === "adjust") return response.statusCode=200, response.end(JSON.stringify(await endpoints.adjustInventory(headers, await readJson(request)))), true;
    return false;
  } catch (error) { response.statusCode = error instanceof Error && error.message === "Forbidden" ? 403 : 400; response.end(JSON.stringify({ code:"REQUEST_FAILED", message:error instanceof Error ? error.message : "Request failed" })); return true; }
}
