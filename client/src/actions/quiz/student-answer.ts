"use server"
import { fetchApi } from "@/lib/fetch";

export async function addStudentAnswer(values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchApi(
    "/api/student-answer",
    {
      method: "POST",
      body: JSON.stringify(values),
    },
    headers
  );
  return response.json();
}
