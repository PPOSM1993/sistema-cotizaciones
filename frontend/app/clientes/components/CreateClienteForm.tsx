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

import { Plus } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


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

        const regionesOrdenadas = [...regionesArray].sort(
          (a, b) => a.id - b.id
        )

        setRegiones(regionesOrdenadas)

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-2">
        {/* DATOS GENERALES */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Datos Generales
          </h3>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RUT</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="12.345.678-9"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razón Social</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="Razón Social"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fantasia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Fantasía</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="Nombre Fantasía"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="giro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giro</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="Giro"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


          </div>
        </div>

        {/* CONTACTO */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Contacto
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="correo@empresa.cl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="+56912345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>
        {/* DIRECCIÓN */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold border-b pb-2">
            Ubicación
          </h3>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
                      placeholder="Dirección"
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
                      className="rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="Número"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* REGIONES */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Región</FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => {
                      const parsed = Number(value)

                      field.onChange(parsed)
                      handleRegionChange(parsed)
                    }}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full h-10 rounded-none border focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                        <SelectValue placeholder="Seleccione una región" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
                      {loading && (
                        <SelectItem value="loading" disabled>
                          Cargando...
                        </SelectItem>
                      )}

                      {!loading &&
                        regiones.map((region) => (
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
                <FormItem className="w-full">
                  <FormLabel>Provincia</FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => {
                      const parsed = Number(value)

                      field.onChange(parsed)
                      handleProvinciaChange(parsed)
                    }}
                    disabled={!form.watch("region") || loadingProvincias}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full h-10 rounded-none border focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                        <SelectValue placeholder="Seleccione una provincia" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
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
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* CIUDADES */}
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ciudad</FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => {
                      const parsed = Number(value)

                      field.onChange(parsed)
                      handleCiudadChange(parsed)
                    }}
                    disabled={!form.watch("provincia") || loadingCiudades}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full h-10 rounded-none border focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                        <SelectValue placeholder="Seleccione una ciudad" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
                      {loadingCiudades && (
                        <SelectItem value="loading" disabled>
                          Cargando...
                        </SelectItem>
                      )}

                      {!loadingCiudades &&
                        ciudades.map((ciudad) => (
                          <SelectItem
                            key={ciudad.id}
                            value={String(ciudad.id)}
                          >
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
                <FormItem className="w-full">
                  <FormLabel>Comuna</FormLabel>

                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={
                      !form.watch("ciudad") ||
                      loadingComunas ||
                      comunas.length === 0
                    }
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full h-10 rounded-none border focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                        <SelectValue placeholder="Seleccione una comuna" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent className="rounded-none">
                      {loadingComunas && (
                        <SelectItem value="loading" disabled>
                          Cargando...
                        </SelectItem>
                      )}

                      {!loadingComunas &&
                        comunas.map((comuna) => (
                          <SelectItem
                            key={comuna.id}
                            value={String(comuna.id)}
                          >
                            {comuna.nombre}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>




        </div>


        <div className="space-y-2">
          <h3 className="text-lg font-semibold border-b pb-2">
            Información Adicional
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="vendedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="ID vendedor" {...field} className="rounded-none h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descuento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descuento (%)</FormLabel>
                  <FormControl className="w-full">
                    <Input type="number" min={0} max={100} {...field} className="rounded-none h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-10 rounded-none border focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                        <SelectValue placeholder="Estado cliente" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="prospecto">Prospecto</SelectItem>
                      <SelectItem value="cliente">Cliente</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>




        {/* BOTONES */}
        <div className="flex justify-end gap-3 pt-6 border-t">

          <Button
            type="submit"
            className="
              rounded-none
              bg-green-600
              hover:bg-green-700
              text-white
              cursor-pointer
              hover:text-white
              h-10
            "
          >
            <Plus className="h-6 w-6 text-white" />
            Guardar Cliente
          </Button>
        </div>
      </form>
    </Form>
  )
}