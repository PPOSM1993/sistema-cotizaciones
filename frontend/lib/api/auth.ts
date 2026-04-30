const API_URL = process.env.NEXT_PUBLIC_API_URL

type LoginPayload = {
  email: string
  password: string
}

export async function login(payload: LoginPayload) {
  const response = await fetch(
    `${API_URL}/api/token/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.email, // 🔥 FIX
        password: payload.password,
      }),
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
      "Usuario o contraseña incorrectos"
    )
  }

  return data
}