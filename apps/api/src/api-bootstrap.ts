import { createApiServer } from "./server.js";
import { dispatch } from "./route-dispatcher.js";
import type { CommerceService } from "@commerce-os/application";

export function createCommerceApiServer(service: CommerceService) {
  return createApiServer((request, response) => dispatch(request, response, service));
}
