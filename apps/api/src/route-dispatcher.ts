import type { IncomingMessage, ServerResponse } from "node:http";
import { readJson } from "./json-body.js";
import { createSecureCommerceRoutes } from "./commerce-endpoints.js";
import type { CommerceService } from "@commerce-os/application";

function headers(request: IncomingMessage): Record<string, string | undefined> {
  return { "x-tenant-id": request.headers["x-tenant-id"] as string | undefined, "x-user-id": request.headers["x-user-id"] as string | undefined, "x-user-role": request.headers["x-user-role"] as string | undefined };
}

export async function dispatch(request: IncomingMessage, response: ServerResponse, service: CommerceService): Promise<boolean> {
  const routes = createSecureCommerceRoutes(service);
  try {
    if (request.method === "POST" && request.url === "/products") {
      const result = await routes.createProduct(headers(request), await readJson(request));
      response.statusCode = 201; response.end(JSON.stringify(result)); return true;
    }
    if (request.method === "POST" && request.url === "/orders") {
      const result = await routes.createOrder(headers(request), await readJson(request));
      response.statusCode = 201; response.end(JSON.stringify(result)); return true;
    }
    return false;
  } catch (error) {
    response.statusCode = error instanceof Error && error.message === "Forbidden" ? 403 : 400;
    response.end(JSON.stringify({ code: "REQUEST_FAILED", message: error instanceof Error ? error.message : "Request failed" }));
    return true;
  }
}
