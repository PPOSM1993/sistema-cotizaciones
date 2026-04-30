import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("access_token")?.value

  if (!token) {
    redirect("/login")
  }

  try {
    const res = await fetch(`${API_URL}/api/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Token inválido")
    }

    const user = await res.json()
    return user

  } catch (error) {
    redirect("/login")
  }
}