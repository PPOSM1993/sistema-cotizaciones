const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getProvincias(
  token: string,
  regionId: number
) {
  const response = await fetch(
    `${API_URL}/api/clientes/provincias/?region=${regionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Error obteniendo provincias")
  }

  return response.json()
}