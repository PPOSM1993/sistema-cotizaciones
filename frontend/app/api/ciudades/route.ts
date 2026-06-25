import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const region = searchParams.get("region")

  if (!region || region === "null") {
    return Response.json([], { status: 200 })
  }

  const token = (await cookies()).get("access_token")?.value

  if (!token) {
    return Response.json({ error: "No token" }, { status: 401 })
  }

  const res = await fetch(
    `${API_URL}/api/clientes/provincias/?region=${region}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    return Response.json(
      { error: "Backend error", detail: data },
      { status: 500 }
    )
  }

  return Response.json(data)
}