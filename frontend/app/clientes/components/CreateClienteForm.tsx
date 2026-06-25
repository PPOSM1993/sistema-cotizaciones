"use client"

import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"

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

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Plus } from "lucide-react"

import { ClienteFormData } from "../types/cliente"
import { Region, Provincia, Ciudad, Comuna } from "../types/ubicacion"

export default function CreateClienteForm() {
  const form = useForm<ClienteFormData>({
    defaultValues: {
      rut: "",
      nombre: "",
      fantasia: "",
      giro: "",
      email: "",
      telefono: "",
      direccion: "",
      numero: "",
      region: 0,
      provincia: 0,
      ciudad: 0,
      comuna: 0,
      descuento: 0,
      estado: "prospecto",
      activo: true,
    },
  })

  const [regiones, setRegiones] = useState<Region[]>([])
  const [loadingRegiones, setLoadingRegiones] = useState(true)

  useEffect(() => {
    async function loadRegiones() {
      try {
        console.log("🟡 cargando regiones...")

        const token = localStorage.getItem("access")

        if (!token) {
          console.log("❌ sin token")
          setLoadingRegiones(false)
          return
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/regiones`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        console.log("STATUS REGIONES:", res.status)

        const data = await res.json()

        console.log("📦 regiones:", data)

        setRegiones(data)
      } catch (error) {
        console.error("❌ error regiones:", error)
      } finally {
        setLoadingRegiones(false)
      }
    }

    loadRegiones()
  }, [])

  const onSubmit = (data: ClienteFormData) => {
    console.log("FORM:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* UBICACIÓN */}
        <Card className="rounded-none">
          <CardHeader>
            <CardTitle>Ubicación</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">

            {/* REGIÓN */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Región</FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={loadingRegiones}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-none bg-muted/40 h-10 border w-full">
                        <SelectValue
                          placeholder={
                            loadingRegiones
                              ? "Cargando regiones..."
                              : "Seleccione una región"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {regiones.length === 0 && !loadingRegiones ? (
                        <div className="p-2 text-sm text-muted-foreground">
                          Sin regiones
                        </div>
                      ) : (
                        regiones.map((region) => (
                          <SelectItem
                            key={region.id}
                            value={String(region.id)}
                          >
                            {region.nombre}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PLACEHOLDERS */}
            <div>SELECT PROVINCIA</div>
            <div>SELECT CIUDAD</div>
            <div>SELECT COMUNA</div>

            {/* DIRECCIÓN */}
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none bg-muted/40 h-10 border w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none bg-muted/40 h-10 border w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="rounded-none bg-green-600 hover:bg-green-700">
          <Plus className="h-5 w-5" />
          Guardar Cliente
        </Button>
      </form>
    </Form>
  )
}