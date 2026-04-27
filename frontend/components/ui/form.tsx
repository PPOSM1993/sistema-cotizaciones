"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form"

export const Form = FormProvider

export function FormField({
  ...props
}: React.ComponentProps<typeof Controller>) {
  return <Controller {...props} />
}

export function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-2 ${className}`} {...props} />
  )
}

export function FormLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`text-sm font-medium ${className}`}
      {...props}
    />
  )
}

export function FormControl({
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />
}

export function FormMessage({
  children,
}: {
  children?: React.ReactNode
}) {
  if (!children) return null

  return (
    <p className="text-sm text-red-500">
      {children}
    </p>
  )
}