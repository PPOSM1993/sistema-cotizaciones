"use server"

import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function getRegiones() {
  const cookieStore = await cookies()

  const token = cookieStore.get("access_token")?.value

  if (!token) {
    throw new Error("No existe access_token")
  }

  const response = await fetch(`${API_URL}/api/clientes/regiones/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("No fue posible obtener las regiones")
  }

  return response.json()
}