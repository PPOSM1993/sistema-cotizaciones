"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function loginAction(payload: {
  email: string
  password: string
}) {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  console.log("STATUS:", res.status)
  console.log("DATA:", data)

  if (!res.ok) {
    return {
      success: false,
      message: data?.detail || "Credenciales inválidas",
    }
  }

  const cookieStore = await cookies()

  cookieStore.set("access_token", data.access, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  })

  cookieStore.set("refresh_token", data.refresh, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  })

  // 🔥 NO TRY/CATCH
  redirect("/dashboard")
}