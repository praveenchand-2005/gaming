export interface HealthResponse {
  status: "ok";
  service: "commerce-os-api";
  version: string;
}

export function health(version = "0.1.0"): HealthResponse {
  return {
    status: "ok",
    service: "commerce-os-api",
    version,
  };
}
