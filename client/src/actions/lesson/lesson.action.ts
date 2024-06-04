"use server";
import { fetchApi } from "@/lib/fetch";
import { revalidatePath } from "next/cache";

export async function getLessonList(params?: URLSearchParams) {
  const response = await fetchApi(`/api/lesson?${params?.toString()}`);
  return response.json();
}

export async function getLesson(id: number) {
  const response = await fetchApi(`/api/lesson/${id}`);
  return response.json();
}

export async function addLesson(values: any) {
  const response = await fetchApi("/api/lesson", {
    method: "POST",
    body: values,
  });
  revalidatePath("/teacher");
  return response.json();
}

export async function getQuizDashboard(id: number){
  const response = await fetchApi(`/api/lesson/${id}/dashboard`)
  return response.json()
}

export async function getResourceTypeCount(id: number){
  const response = await fetchApi(`/api/lesson/${id}/resource-type-count`)
  return response.json()
}

export async function getLessonScore(id: number){
  const response = await fetchApi(`/api/lesson/${id}/score`)
  return response.json()
}

export async function updateLesson(id: number, values: any) {
  const response = await fetchApi(`/api/lesson/${id}`, {
    method: "PUT",
    body: values,
  });
  revalidatePath("/teacher");
  revalidatePath("/teacher/edit-lesson");
  return response.json();
}

export type Lesson = {
  id: number;
  title: string;
  subtitle: string;
  coverImage: string;
  lesson_files: LessonFile[];
  lesson_pages: number;
};

export type LessonFile = {
  id: number;
  file: string;
};

export type Dashboard = {
  score: {
    correct_answer: number,
    over: number,
  },
  time: number,
  student: {
    first_name: string,
    last_name: string,
  },
  resourceType: "TEXT" | "VIDEO"
}