import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { health } from "./health.js";

export type RequestHandler = (request: IncomingMessage, response: ServerResponse) => Promise<boolean> | boolean;

export function createApiServer(handler?: RequestHandler) {
  return createServer(async (request, response) => {
    response.setHeader("content-type", "application/json; charset=utf-8");
    if (request.method === "GET" && request.url === "/health") {
      response.statusCode = 200;
      response.end(JSON.stringify(health()));
      return;
    }
    if (handler && await handler(request, response)) return;
    if (!response.writableEnded) {
      response.statusCode = 404;
      response.end(JSON.stringify({ code: "NOT_FOUND", message: "Route not found" }));
    }
  });
}

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);
  createApiServer().listen(port, () => console.log(`Commerce OS API listening on :${port}`));
}
