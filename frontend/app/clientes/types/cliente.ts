export type Cliente = {
  id: number
  rut: string
  nombre: string
  estado: "prospecto" | "cliente" | "inactivo"
  vendedor: string
}