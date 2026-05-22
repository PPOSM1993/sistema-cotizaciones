"use client"

const topClients = [
    {
        id: 1,
        nombre: "Forestal Sur",
        cotizaciones: 24,
    },
    {
        id: 2,
        nombre: "Agrícola Temuco",
        cotizaciones: 18,
    },
    {
        id: 3,
        nombre: "Constructora Andes",
        cotizaciones: 15,
    },
    {
        id: 4,
        nombre: "Transportes del Sur",
        cotizaciones: 12,
    },
]

export default function DashboardTopClients() {
    return (
        <div className="rounded-none border bg-card p-6">
            <h2 className="mb-4 text-xl font-bold uppercase">
                Top Clientes
            </h2>

            <div className="space-y-4">
                {topClients.map((client, index) => (
                    <div
                        key={client.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                                {index + 1}
                            </div>

                            <span className="font-medium">
                                {client.nombre}
                            </span>
                        </div>

                        <span className="text-sm text-muted-foreground">
                            {client.cotizaciones} cotizaciones
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}