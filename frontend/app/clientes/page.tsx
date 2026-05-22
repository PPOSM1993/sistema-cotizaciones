import ClientesClient from "./components/ClientesClient";

export default function ClientesPage() {
    return (
        <>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Clientes</h1>
                <p className="text-muted-foreground">
                    Gestión de clientes del sistema
                </p>
                <ClientesClient/>
            </div>
        </>
    )
}