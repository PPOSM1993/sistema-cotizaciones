"use client"

import Link from "next/link"
import { Home, Ticket, Users, Settings, Forklift, ChartColumnStacked, FileMinus, BarChart3, Bell } from "lucide-react"

import Image from "next/image"

const menuItems = [
    {
        title: "Operación",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Clientes", href: "/clientes", icon: Users },
            { label: "Cotizaciones", href: "/cotizaciones", icon: FileMinus },
            { label: "Seguimiento", href: "/seguimiento", icon: Bell },
        ],
    },
    {
        title: "Inventario",
        items: [
            { label: "Maquinarias", href: "/maquinas", icon: Forklift },
        ],
    },
    {
        title: "Análisis",
        items: [
            { label: "Reportes", href: "/reportes", icon: BarChart3 },
        ],
    },
    {
        title: "Administración",
        items: [
            { label: "Marcas", href: "/marcas", icon: Ticket },
            { label: "Categorías", href: "/categorias", icon: ChartColumnStacked },
            { label: "Configuración", href: "/settings", icon: Settings },
        ],
    },
]

type Props = {
    collapsed?: boolean
}

export function Sidebar({ collapsed }: Props) {
    return (
        <aside
            className={`
        border-r bg-background min-h-screen p-4
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
        >

            {/* Logo */}
            <div className="flex justify-left mb-6">
                <Image
                    src="/logo.png"
                    alt="Mesa de Ayuda"
                    width={collapsed ? 40 : 160}
                    height={100}
                />
            </div>
            <hr className="p-2 border-md border-primary/10 mb-2" />

            <nav className="space-y-4">
                {menuItems.map((section) => (
                    <div key={section.title}>

                        {/* TÍTULO */}
                        {!collapsed && (
                            <p className="text-xs font-semibold text-muted-foreground px-3">
                                {section.title}
                            </p>
                        )}

                        {/* ITEMS */}
                        <div className="space-y-1 mt-2">
                            {section.items.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`
              flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted transition
              ${collapsed ? "justify-center" : "gap-3"}
            `}
                                >
                                    <Icon className="h-5 w-5" />

                                    {!collapsed && (
                                        <span className="font-medium">
                                            {label}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>

                    </div>
                ))}
            </nav>

        </aside>
    )
}