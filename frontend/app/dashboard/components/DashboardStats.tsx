"use client"

import StatCard from "./StatCard"

import {
    Users,
    FileText,
    Package,
    DollarSign,
    Forklift,
} from "lucide-react"

export default function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <StatCard
                title="Clientes"
                value="125"
                description="+12 este mes"
                icon={<Users size={18} />}
                color="border-blue-500"
            />

            <StatCard
                title="Cotizaciones"
                value="48"
                description="+8 esta semana"
                icon={<FileText size={18} />}
                color="border-orange-500"
            />

            <StatCard
                title="Maquinas"
                value="356"
                description="12 nuevos"
                icon={<Forklift size={18} />}
                color="border-green-500"
            />

            <StatCard
                title="Ventas"
                value="$45M"
                description="+15%"
                icon={<DollarSign size={18} />}
                color="border-purple-500"
            />

        </div>
    )
}