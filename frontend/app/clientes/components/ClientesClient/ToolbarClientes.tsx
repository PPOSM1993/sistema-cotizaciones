"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onCreate: () => void
  
}

export default function ToolbarClientes({
  onCreate,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <Input
        placeholder="Buscar cliente..."
        className="pl-8 bg-muted/50 rounded-none border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none"
      />

      <Button
        onClick={onCreate}
        className="bg-green-600 border-none rounded-none hover:bg-green-700 cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Cliente
      </Button>

    </div>
  );
}