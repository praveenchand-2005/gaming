import type { IncomingMessage } from "node:http";

export async function readJson<T>(request: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = [];
  for await (const chunk of request) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) throw new Error("Request body is required");
  try { return JSON.parse(raw) as T; } catch { throw new Error("Invalid JSON body"); }
}
