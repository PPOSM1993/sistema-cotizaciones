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
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : ""}
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

        <button type="submit">Guardar</button>

      </form>
    </Form>
  )
}