import type { IncomingMessage, ServerResponse } from "node:http";
import type { CommerceService } from "@commerce-os/application";
import { dispatch } from "./route-dispatcher.js";
import { dispatchAction } from "./action-route-dispatcher.js";
import type { ReturnType } from "node:module";

export function createCommerceOsDispatcher(service: CommerceService, actionEndpoints: Parameters<typeof dispatchAction>[2]) {
  return async (request: IncomingMessage, response: ServerResponse): Promise<boolean> => {
    if (await dispatchAction(request, response, actionEndpoints)) return true;
    return dispatch(request, response, service);
  };
}
