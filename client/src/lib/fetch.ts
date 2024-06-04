import { auth } from "@/lib/auth";

export async function fetchApi(
  pathName: string,
  init?: Omit<RequestInit, "headers">,
  headersInit?: HeadersInit
) {
  const session = await auth();
  const headers: HeadersInit = new Headers(headersInit);
  if (session) {
    headers.append("Authorization", `Token ${session.user.token}`);
  }
  return fetch(`${process.env.SERVER_API}${pathName}`, {
    ...init,
    headers,
  });
}
