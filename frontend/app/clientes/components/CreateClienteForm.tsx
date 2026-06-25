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
                  field.onChange(parsed || undefined)
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

        <button type="submit">Guardar</button>

      </form>
    </Form>
  )
}