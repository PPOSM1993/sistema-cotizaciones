"use client"
import Image from "next/image"

import LoginCard from "./components/LoginCard"

export default function Login() {
    return (
        <>
            <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
                <main className="flex w-full max-w-4xl flex-col items-center justify-center gap-16 px-6 py-32 text-center sm:text-left">

                    {/* Logo / Branding */}
                    <div className="flex flex-col items-center gap-6 sm:items-center">
                        <Image
                            src="/logo-2.png" // opcional, puedes cambiarlo
                            alt="Mesa de Ayuda"
                            width={200}
                            height={100}
                        />
                    </div>

                    {/* CTA */}
                    <div className="flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-start">

                        <div className="w-full">
                            <LoginCard />
                        </div>


                    </div>

                </main>
            </div>
        </>
    )
}
