import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function GET() {

  console.log("API_URL:", API_URL)
  try {
    const token = (await cookies()).get("access_token")?.value

    console.log("TOKEN:", token)

    if (!token) {
      return Response.json({ error: "No token" }, { status: 401 })
    }

    const res = await fetch(`${API_URL}/api/clientes/regiones/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    const text = await res.text()
    console.log("BACKEND RESPONSE:", text)

    if (!res.ok) {
      return Response.json(
        { error: "Backend error", detail: text },
        { status: 500 }
      )
    }

    return new Response(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    console.error("API ROUTE ERROR:", err)

    return Response.json(
      { error: "Server crash", detail: err.message },
      { status: 500 }
    )
  }
}