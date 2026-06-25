export async function getProvincias(regionId: number) {
  const res = await fetch(`/api/provincias?region=${regionId}`)

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data?.detail || "Error obteniendo provincias")
  }

  return data
}