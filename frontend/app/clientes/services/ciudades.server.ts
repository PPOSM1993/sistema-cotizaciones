const API_URL = process.env.NEXT_PUBLIC_API_URL


export async function getCiudades(
  token: string,
  provinciaId: number
) {
  const response = await fetch(
    `${API_URL}/api/clientes/ciudades/?province=${provinciaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    throw new Error("Error obteniendo ciudades")
  }

  return response.json()
}