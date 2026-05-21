"use client"

type Props = {
  estado: string
}

export default function ClienteEstadoBadge({
  estado,
}: Props) {

  const styles = {
    prospecto:
      "bg-yellow-100 text-yellow-700",

    cliente:
      "bg-green-100 text-green-700",

    inactivo:
      "bg-gray-100 text-gray-700",
  }

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${
        styles[estado as keyof typeof styles]
      }`}
    >
      {estado}
    </span>
  )
}