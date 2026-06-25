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

  region: number
  provincia: number
  ciudad: number
  comuna: number

  descuento: number

  estado: EstadoCliente

  activo: boolean
}