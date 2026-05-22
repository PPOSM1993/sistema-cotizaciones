"use client"

export const columns = [
    "rut",
    "nombre",
    "estado",
    "vendedor",
]

export function ClienteColumns() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                {columns.map((col) => (
                    <div key={col} className="font-bold">
                        {col.toUpperCase()}
                    </div>
                ))}
            </div>
        </>
    )
}