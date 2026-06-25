export interface Region {
  id: number
  nombre: string
}

export interface Provincia {
  id: number
  nombre: string
  region: number
}

export interface Ciudad {
  id: number
  nombre: string
  province: number
}

export interface Comuna {
  id: number
  nombre: string
  city: number
}