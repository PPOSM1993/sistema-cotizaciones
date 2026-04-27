const API_URL = process.env.NEXT_PUBLIC_API_URL

type LoginPayload = {
  username: string
  password: string
}

export async function login(payload: LoginPayload) {
  const response = await fetch(
    `${API_URL}/api/authentication/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  const text = await response.text()

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error("Error inesperado del servidor")
  }

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.non_field_errors?.[0] ||
      "Usuario o contraseña incorrectos"
    )
  }

  return data
}