"use server";
import { fetchApi } from "@/lib/fetch";

export async function addLessonResourceType(values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchApi(
    "/api/lesson-resource-type",
    {
      method: "POST",
      body: JSON.stringify(values),
    },
    headers
  );
  return response.json();
}
