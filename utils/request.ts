import type { IAPIResponseError, PollOptions, Scalar } from "types";

export async function get<
  ResponseData extends Record<symbol, Scalar>,
>(uri: string, token?: string): Promise<ResponseData> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token != null) {
    headers["Authorization"] = `token ${token}`;
  }

  const response = await fetch(uri, {
    method: "GET",
    cache: "no-cache",
    headers,
    referrerPolicy: "no-referrer",
  });

  return response.json();
}

export async function post<
  ResponseData extends Record<symbol, Scalar>,
>(uri: string, payload: Record<symbol, string>): Promise<ResponseData> {
  const response = await fetch(uri, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(payload),
  });

  return response.json();
}

export function poll<ResponseData extends Record<symbol, Scalar>>(
  uri: string,
  payload: Record<symbol, string>,
  options: PollOptions = {
    interval: 1000,
    expiresIn: 5000,
  },
): Promise<ResponseData> {
  let expirationTimeOut: number, pollInterval: number;
  const removeTimers = (): void => {
    clearTimeout(expirationTimeOut);
    clearInterval(pollInterval);
  };

  const pollPromise = new Promise(
    (
      resolve: (response: ResponseData) => void,
      reject: (reason: IAPIResponseError) => void,
    ) => {
      expirationTimeOut = setTimeout(() => {
        removeTimers();
        reject({
          error: true,
          message: "User did not enter in User Code in time, please restart.",
        });
      }, options.expiresIn);

      pollInterval = setInterval(async () => {
        const response = await post<ResponseData>(uri, payload);
        if (!response.hasOwnProperty("error")) {
          removeTimers();
          resolve(response);
        } else if (response.hasOwnProperty("interval")) {
          removeTimers();
          reject({
            error: true,
            message:
              "Something went wrong with our interval polling... Please try again.",
          });
        }
      }, options.interval);
    },
  );

  return pollPromise;
}
