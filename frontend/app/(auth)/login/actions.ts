"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function loginAction(payload: {
  email: string
  password: string
}) {
  try {
    const res = await fetch(`${API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.detail ||
          data?.non_field_errors?.[0] ||
          "Credenciales inválidas",
      }
    }

    // ✅ FIX AQUÍ
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

    return { success: true }

  } catch (error) {
    return {
      success: false,
      message: "Error de conexión con el servidor",
    }
  }
}