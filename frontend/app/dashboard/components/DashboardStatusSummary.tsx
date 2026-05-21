"use client"

export default function DashboardStatusSummary() {
    return (
        <div className="rounded-none border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
                Estado Cotizaciones
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">
                    <span>Pendientes</span>
                    <span className="font-semibold">
                        12
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Aprobadas</span>
                    <span className="font-semibold text-green-600">
                        25
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Rechazadas</span>
                    <span className="font-semibold text-red-600">
                        3
                    </span>
                </div>

            </div>
        </div>
    )
}