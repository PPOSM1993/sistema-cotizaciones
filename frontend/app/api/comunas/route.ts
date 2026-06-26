import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const city = searchParams.get("city")

  if (!city) {
    return Response.json([], { status: 200 })
  }

  const token = (await cookies()).get("access_token")?.value

  if (!token) {
    return Response.json({ error: "No token" }, { status: 401 })
  }

  const res = await fetch(
    `${API_URL}/api/clientes/comunas/?city=${city}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  const data = await res.json().catch(() => [])

  if (!res.ok) {
    return Response.json(
      {
        error: "Backend error",
        detail: data,
      },
      { status: 500 }
    )
  }

  return Response.json(data)
}