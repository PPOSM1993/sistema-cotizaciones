"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { LogIn, MoveLeftIcon } from "lucide-react"
import { login } from "@/lib/api/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchema } from "@/lib/validations/auth"

import { Loader2 } from "lucide-react"
import { loginAction } from "../actions"


type LoginFormValues = {
    username: string
    password: string
}

export default function LoginForm() {

    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    const onSubmit = async (data: LoginSchema) => {
        try {
            setIsLoading(true)

            await loginAction(data)

            toast.success("Bienvenido 👋")
            router.push("/dashboard")

        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setIsLoading(false)
        }
    }
    return (

        <>
            <div className="flex flex-col space-y-3 border-b border-gray-200 bg-white px-4 py-6 text-center">
                {/* HEADER */}
                <div className="mb-6 space-y-2">
                    <h1 className="text-2xl font-semibold">Iniciar Sesión</h1>
                    <p className="text-sm text-muted-foreground">
                        Ingresa tus credenciales para acceder
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >

                    </form>
                </Form>

            </div>
        </>
    )
}