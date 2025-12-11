export async function POST(request: Request) {
  try {
    console.log("[v0] Register API called")
    const body = await request.json()

    console.log("[v0] Registering with data:", {
      email: body.email,
      fullName: body.fullName,
    })

    const response = await fetch("https://jtestlabs.com/api/user/jobseeker/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Register API error:", data)
      return Response.json({ error: data.message || "Registration failed" }, { status: response.status })
    }

    console.log("[v0] Register API success:", { userId: data.data?.id || data.id })
    return Response.json(data)
  } catch (error: any) {
    console.error("[v0] Register API exception:", error.message)
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
