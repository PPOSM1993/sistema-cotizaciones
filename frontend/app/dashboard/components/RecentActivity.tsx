"use client"

import {
    UserPlus,
    FileText,
    Pencil,
    XCircle
} from "lucide-react"

const activities = [
    {
        id: 1,
        icon: UserPlus,
        text: 'Cliente "Forestal Sur" creado',
        date: "Hace 5 min",
    },
    {
        id: 2,
        icon: FileText,
        text: "Cotización #COT-001 creada",
        date: "Hace 20 min",
    },
    {
        id: 3,
        icon: Pencil,
        text: 'Cliente "Agrícola Temuco" actualizado',
        date: "Hace 1 hora",
    },
    {
        id: 4,
        icon: XCircle,
        text: "Cotización #COT-003 rechazada",
        date: "Hace 2 horas",
    },
]

export default function DashboardRecentActivity() {
    return (
        <div className="rounded-none border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold uppercase">
                Actividad Reciente
            </h2>

            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = activity.icon

                    return (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between border-b pb-3"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 text-orange-500" />

                                <span className="text-sm">
                                    {activity.text}
                                </span>
                            </div>

                            <span className="text-xs text-muted-foreground">
                                {activity.date}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}