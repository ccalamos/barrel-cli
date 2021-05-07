export async function post<
  ResponseData extends Record<symbol, string | number>,
>(url: string, payload: Record<symbol, string>): Promise<ResponseData> {
  const response = await fetch(url, {
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
