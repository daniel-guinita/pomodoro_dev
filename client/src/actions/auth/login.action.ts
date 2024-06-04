"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function authenticate(values: any, callbackUrl: string) {
  try {
    await signIn("credentials", {
      ...values,
      redirectTo: callbackUrl,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return error.message;
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function login(values: any) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await fetch(`${process.env.SERVER_API}/api/login`, {
    method: "POST",
    body: JSON.stringify(values),
    headers,
  });
  return response.json();
}
