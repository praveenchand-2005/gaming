import { Pool } from "pg";

export function createPostgresPool(connectionString = process.env.DATABASE_URL) {
  if (!connectionString) throw new Error("DATABASE_URL is required");
  return new Pool({ connectionString, max: Number(process.env.DB_POOL_SIZE ?? 10), idleTimeoutMillis: 30_000 });
}
