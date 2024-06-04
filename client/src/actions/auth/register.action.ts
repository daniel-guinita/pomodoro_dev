"use server";

import { fetchApi } from "@/lib/fetch";

export async function register(values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const response = await fetchApi(
    "/api/register",
    {
      method: "POST",
      body: JSON.stringify(values),
    },
    headers
  );

  return response.json();
}
