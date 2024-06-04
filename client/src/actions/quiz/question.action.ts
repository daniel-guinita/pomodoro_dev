"use server";
import { fetchApi } from "@/lib/fetch";
import { revalidatePath } from "next/cache";

export async function getQuizQuestionList(params?: URLSearchParams) {
  const response = await fetchApi(`/api/quiz-question?${params?.toString()}`);
  return response.json();
}

export async function getQuizQuestion(id: number) {
  const response = await fetchApi(`/api/quiz-question/${id}`);
  return response.json();
}

export async function updateQuizQuestion(id: number, values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchApi(
    `/api/quiz-question/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(values),
    },
    headers
  );
  return response.json();
}

export async function addQuizQuestion(values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetchApi(
    "/api/quiz-question",
    {
      method: "POST",
      body: JSON.stringify(values),
    },
    headers
  );
  revalidatePath("/teacher/lesson/[id]", "page");
  return response.json();
}

export interface QuizQuestion {
  id:          number;
  lesson_page: number;
  text:        string;
  answers:     Answer[];
}

export interface Answer {
  id:         number;
  question:   number;
  text:       string;
  is_correct: boolean;
}

