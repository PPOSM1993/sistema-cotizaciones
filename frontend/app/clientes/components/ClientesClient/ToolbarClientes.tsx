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

      <Button
        onClick={onCreate}
        className="bg-green-600 border-none rounded-none hover:bg-green-700 cursor-pointer">
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Cliente
      </Button>



    </div>
  );
}