import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const cookieStore = await cookies()

    const token = cookieStore.get("access_token")?.value

    if (!token) {
      return NextResponse.json(
        { detail: "No existe token de autenticación." },
        { status: 401 }
      )
    }

    const response = await fetch(
      `${API_URL}/api/clientes/clientes/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
    })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        detail: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    )
  }
}