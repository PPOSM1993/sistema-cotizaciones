"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Menu,
  Search,
  Bell,
  Sun,
  User,
  LogOut
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { logout } from "@/lib/auth.server"


type Props = {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: Props) {
  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">

        {/* IZQUIERDA */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative w-[280px]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-8 bg-muted/50"
            />
          </div>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-3">
          {/* Notificaciones */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Dark / Light (placeholder) */}
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5" />
          </Button>

          {/* Perfil de usuario */}
          <Button variant="ghost" className="p-0 rounded-full">
            <Avatar className="h-8 w-8 cursor-pointer">
              {/* Luego solo cambias src */}
              <AvatarImage src="" alt="User profile" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
          <Button variant="ghost" size="icon"
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

      </div>
    </header>
  )
}