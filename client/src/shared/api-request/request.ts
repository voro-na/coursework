import { createEffect } from "effector";
import { HttpError, NetworkError } from "@/types/application-error";
import { IResponse, isErrorResponse } from "@/types/response";

export interface IRequest {
  url: string | URL;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: { json: unknown };
}

type Payload<TParams> = IRequest | ((params: TParams) => IRequest);

export const createRequestFx = <TParams, TResult>(
  payload: Payload<TParams>,
) => {
  return createEffect<TParams, TResult, HttpError>(async (params) => {
    const request = typeof payload === "function" ? payload(params) : payload;
    const headers = new Headers({ Accept: "application/json" });

    if (request.body?.json) {
      headers.set("Content-Type", "application/json");
    }

    try {
      const response = await fetch(request.url, {
        method: request.method,
        body: request.body?.json
          ? JSON.stringify(request.body?.json)
          : undefined,
        headers,
      });
      const body: IResponse = await response.json();

      if (isErrorResponse(body)) {
        throw new HttpError(body.error.message, body.error.statusCode);
      }

      return body as TResult;
    } catch (e) {
      throw new NetworkError("Network error");
    }
  });
};
