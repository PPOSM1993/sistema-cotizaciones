import { fetchAuth } from "../frontend/app/clientes/services/api"

export function getRegiones() {
  return fetchAuth("http://localhost:8000/api/clientes/regiones/")
}