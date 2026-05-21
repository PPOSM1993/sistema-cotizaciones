"use client"

import { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  description?: string
  icon?: ReactNode
  color?: string
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  color = "border-slate-500",
}: StatCardProps) {
  return (
    <div
      className={`rounded-none border bg-white p-5 shadow-sm border-t-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-muted-foreground">
          {title}
        </h3>

        {icon}
      </div>

      <div className="mt-3">
        <p className="text-3xl font-bold">
          {value}
        </p>

        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}