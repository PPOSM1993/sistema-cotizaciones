"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function loginAction(payload: {
  username: string
  password: string
}) {
  const res = await fetch(`${API_URL}/api/authentication/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Credenciales inválidas")
  }

  const data = await res.json()

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
}