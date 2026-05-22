"use client";

import ClienteTable from "./ClientesClient/ClienteTable";
import ToolbarClientes from "./ClientesClient/ToolbarClientes";


export default function ClientesClient() {
    return(
        <div className="space-y-6">

            <ToolbarClientes/>

            <ClienteTable/>
        </div>
    )
}