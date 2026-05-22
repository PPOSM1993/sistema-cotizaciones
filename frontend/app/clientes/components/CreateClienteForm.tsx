"use client"

import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CircleX, Plus } from "lucide-react"


type ClienteFormValues = {
  rut: string
  nombre: string
  fantasia: string
  giro: string
  email: string
  telefono: string
  direccion: string
  numero: string
  region: string
  comuna: string
  vendedor: string
  estado: string
  descuento: string
}

export default function CreateClienteForm() {
  const form = useForm<ClienteFormValues>({
    defaultValues: {
      rut: "",
      nombre: "",
      fantasia: "",
      giro: "",
      email: "",
      telefono: "",
      direccion: "",
      numero: "",
      region: "",
      comuna: "",
      vendedor: "",
      estado: "",
      descuento: "",
    },
  })

  const onSubmit = (data: ClienteFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 py-2"
      >
        {/* DATOS GENERALES */}
        <div className="space-y-5 pb-8">
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="+56 9 1234 5678"
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
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b pb-2">
            Dirección
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
                      className="pl-8 rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
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
                      className="pl-8rounded-none border-sm focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none h-10"
                      placeholder="Número"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            className="rounded-none bg-red-600 hover:bg-red-700 text-white cursor-pointer hover:text-white h-10"
          >
            <CircleX className="h-10 w-10 text-white" />
            Cancelar
          </Button>

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