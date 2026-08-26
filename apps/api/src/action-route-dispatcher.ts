import type { IncomingMessage, ServerResponse } from "node:http";
import type { createActionEndpoints } from "./action-endpoints.js";

export async function dispatchAction(request: IncomingMessage, response: ServerResponse, endpoints: ReturnType<typeof createActionEndpoints>): Promise<boolean> {
  const parts = (request.url ?? "").split("/").filter(Boolean);
  if (request.method !== "POST" || parts.length !== 3 || parts[0] !== "actions" || parts[2] !== "approve") return false;
  const headers = { "x-tenant-id": request.headers["x-tenant-id"] as string|undefined, "x-user-id": request.headers["x-user-id"] as string|undefined, "x-user-role": request.headers["x-user-role"] as string|undefined };
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  const result = await endpoints.approveAndExecute(headers, parts[1], body.agentId);
  response.statusCode = 200; response.end(JSON.stringify(result)); return true;
}
