"use client"

export default function DashboardFollowUps() {
    return (
        <>
            <div className="rounded-none border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold uppercase">
                    Seguimientos Pendientes
                </h2>

                <div className="space-y-3">

                    <div className="flex justify-between">
                        <span>Forestal Sur</span>
                        <span className="text-muted-foreground">
                            Hoy
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Agrícola Temuco</span>
                        <span className="text-muted-foreground">
                            Mañana
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Constructora Andes</span>
                        <span className="text-muted-foreground">
                            28/05
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}