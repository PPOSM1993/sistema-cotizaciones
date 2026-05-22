"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ToolbarClientes() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <Input
        placeholder="Buscar cliente..."
        className="max-w-sm rounded-none"
      />

      <Button className="bg-green-600 border-none rounded-none hover:bg-green-700 cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Cliente
      </Button>

    </div>
  );
}