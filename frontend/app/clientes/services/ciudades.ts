export async function getCiudades(provinciaId: number) {
  const res = await fetch(
    `/api/ciudades?province=${provinciaId}`
  )

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.detail || "Error obteniendo ciudades")
  }

  return Array.isArray(data) ? data : []
}