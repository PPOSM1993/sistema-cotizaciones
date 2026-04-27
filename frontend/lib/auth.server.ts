"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getAccessToken() {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value
}

export async function logout() {
  const cookieStore = await cookies()
  const refresh = cookieStore.get("refresh_token")?.value

  if (refresh) {
    await fetch("http://localhost:8000/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh }),
    })
  }

  cookieStore.delete("access_token")
  cookieStore.delete("refresh_token")

  redirect("/login")
}