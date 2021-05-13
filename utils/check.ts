import type { IAPIResponseError, IGitHubResponseError, Scalar } from "types";

export function isErrorResponse(
  response: Record<symbol, Scalar>,
): response is IGitHubResponseError | IAPIResponseError {
  return !!(response as IGitHubResponseError).error ||
    (response as IAPIResponseError).error;
}
