const API_URL = process.env.NEXT_PUBLIC_API_URL


export async function getComunas(
  token: string,
  ciudadId: number
) {
  const response = await fetch(
    `${API_URL}/api/clientes/comunas/?city=${ciudadId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Error obteniendo comunas")
  }

  return response.json()
}