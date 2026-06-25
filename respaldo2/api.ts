export async function fetchAuth(url: string) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access")
      : null

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    console.error("API ERROR:", response.status, data)
    throw new Error("Error API")
  }

  return data
}