import { fetchAuth } from "./api";

export function getCities(token: string, regionId: number) {
  return fetchAuth(
    `http://localhost:8000/api/clientes/ciudades/?region=${regionId}`,
    token
  )
}