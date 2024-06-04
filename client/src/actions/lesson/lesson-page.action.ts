"use server";
import { fetchApi } from "@/lib/fetch";
import { revalidatePath } from "next/cache";

export async function getLessonPageList(params?: URLSearchParams) {
  const response = await fetchApi(`/api/lesson-page?${params?.toString()}`);
  return response.json();
}

export async function getLessonPage(id: number) {
  const response = await fetchApi(`/api/lesson-page/${id}`);
  return response.json();
}

export async function updateLessonPage(id: number, values: any) {
  const response = await fetchApi(`/api/lesson-page/${id}`, {
    method: "PUT",
    body: values,
  });
  return response.json();
}

export async function addLessonPage(values: any) {
  const response = await fetchApi("/api/lesson-page", {
    method: "POST",
    body: values,
  });
  revalidatePath("/teacher/lesson/[id]", "page");
  return response.json();
}

export type LessonPage = {
  id: number;
  lesson: number;
  title: string;
  contents: string;
  video: null | string;
  video_link: string;
  question?: number;
};
