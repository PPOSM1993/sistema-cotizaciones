import { fetchAuth } from "./api";

export function getComunas(token: string, cityId: number) {
  return fetchAuth(
    `http://localhost:8000/api/clientes/comunas/?city=${cityId}`,
    token
  )
}