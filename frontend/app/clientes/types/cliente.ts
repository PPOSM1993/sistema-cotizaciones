export type EstadoCliente =
  | "prospecto"
  | "cliente"
  | "inactivo"

export interface ClienteFormData {
  rut: string
  nombre: string

  fantasia?: string
  giro?: string

  email?: string
  telefono?: string

  direccion?: string
  numero?: string

  region: number | null
  provincia: number | null
  ciudad: number | null
  comuna: number | null

  descuento: number

  estado: EstadoCliente

  activo: boolean
}