"use client"

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ClienteFormData } from "../types/cliente"
import { getProvincias } from "../services/provincias"
import { getCiudades } from "../services/ciudades"
import { getComunas } from "../services/comunas"


export default function CreateClienteForm() {
  const form = useForm<ClienteFormData>({
    defaultValues: {
      region: 0,
      provincia: 0,
      ciudad: 0,
      comuna: 0,
    } as any,
  })

  const [regiones, setRegiones] = useState<any[]>([])

  const [provincias, setProvincias] = useState<any[]>([])
  const [loadingProvincias, setLoadingProvincias] = useState(false)

  const [ciudades, setCiudades] = useState<any[]>([])
  const [loadingCiudades, setLoadingCiudades] = useState(false)

  const [comunas, setComunas] = useState<any[]>([])
  const [loadingComunas, setLoadingComunas] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargarRegiones() {
      try {
        setLoading(true)

        const res = await fetch("/api/regiones")
        const data = await res.json()

        console.log("REGIONES:", data)

        const regionesArray = Array.isArray(data)
          ? data
          : data.data ?? data.results ?? []

        setRegiones(regionesArray)

      } catch (error) {
        console.error("Error cargando regiones:", error)
      } finally {
        setLoading(false)
      }
    }

    cargarRegiones()
  }, [])

  const handleRegionChange = async (regionId: number) => {
    form.setValue("region", regionId)

    setProvincias([])
    form.setValue("provincia", 0)

    try {
      setLoadingProvincias(true)

      const data = await getProvincias(regionId)

      setProvincias(data)
    } catch (error) {
      console.error("Error provincias:", error)
    } finally {
      setLoadingProvincias(false)
    }
  }

  const handleProvinciaChange = async (provinciaId: number) => {
    form.setValue("provincia", provinciaId)

    setCiudades([])
    form.setValue("ciudad", 0)

    try {
      setLoadingCiudades(true)

      const data = await getCiudades(provinciaId)

      console.log("Ciudades:", data)

      setCiudades(data)
    } catch (error) {
      console.error("Error ciudades:", error)
    } finally {
      setLoadingCiudades(false)
    }
  }

  const handleCiudadChange = async (ciudadId: number) => {
    form.setValue("ciudad", ciudadId)

    setComunas([])
    form.setValue("comuna", 0)

    try {
      setLoadingComunas(true)

      const data = await getComunas(ciudadId)

      console.log("COMUNAS:", data)

      setComunas(data)
    } catch (error) {
      console.error("Error comunas:", error)
    } finally {
      setLoadingComunas(false)
    }
  }

  const onSubmit = (data: ClienteFormData) => {
    console.log("FORM:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* REGIONES */}
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Región</FormLabel>

              <Select
                onValueChange={(value) => handleRegionChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una región" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {loading && <SelectItem value="loading">Cargando...</SelectItem>}

                  {regiones.map((region) => (
                    <SelectItem
                      key={region.id}
                      value={String(region.id)}
                    >
                      {region.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* PROVINCIAS */}

        <FormField
          control={form.control}
          name="provincia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia</FormLabel>

              <Select
                onValueChange={(value) => {
                  const parsed = Number(value)

                  field.onChange(parsed)
                  handleProvinciaChange(parsed)
                }}
                value={field.value ? String(field.value) : ""}
                disabled={!form.watch("region") || loadingProvincias}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una provincia" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {loadingProvincias && (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  )}

                  {!loadingProvincias &&
                    provincias.map((provincia) => (
                      <SelectItem
                        key={provincia.id}
                        value={String(provincia.id)}
                      >
                        {provincia.nombre}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* CIUDADES */}
        <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => {
                  const parsed = Number(value)

                  field.onChange(parsed)
                  handleCiudadChange(parsed) // ✅ CORRECTO
                }}
                disabled={!form.watch("provincia") || loadingCiudades}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una ciudad" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {loadingCiudades && (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  )}

                  {ciudades.map((ciudad) => (
                    <SelectItem key={ciudad.id} value={String(ciudad.id)}>
                      {ciudad.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* COMUNAS */}
        <FormField
          control={form.control}
          name="comuna"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comuna</FormLabel>

              <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => {
                  field.onChange(Number(value))
                }}
                disabled={!form.watch("ciudad") || loadingComunas || comunas.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una comuna" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {loadingComunas && (
                    <SelectItem value="loading" disabled>
                      Cargando...
                    </SelectItem>
                  )}

                  {!loadingComunas &&
                    comunas.map((comuna) => (
                      <SelectItem key={comuna.id} value={String(comuna.id)}>
                        {comuna.nombre}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <button type="submit">Guardar</button>

      </form>
    </Form>
  )
}