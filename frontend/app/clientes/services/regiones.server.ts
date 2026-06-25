"use server"

export async function getRegiones(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/regiones`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) throw new Error("Error")

  return res.json()
}