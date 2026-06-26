export async function getComunas(ciudadId: number) {
  const res = await fetch(`/api/comunas?city=${ciudadId}`)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.detail || "Error obteniendo comunas")
  }

  return Array.isArray(data) ? data : []
}