import { createServer } from "node:http";
import { health } from "./health.js";

export function createApiServer() {
  return createServer((request, response) => {
    response.setHeader("content-type", "application/json; charset=utf-8");
    if (request.method === "GET" && request.url === "/health") {
      response.statusCode = 200;
      response.end(JSON.stringify(health()));
      return;
    }
    response.statusCode = 404;
    response.end(JSON.stringify({ code: "NOT_FOUND", message: "Route not found" }));
  });
}

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT ?? 3000);
  createApiServer().listen(port, () => console.log(`Commerce OS API listening on :${port}`));
}
