export async function POST(request: Request) {
  try {
    console.log("[v0] Upload API called")
    const body = await request.json()

    console.log("[v0] Uploading document:", {
      userId: body.userId,
      documentType: body.documentType,
      fileName: body.fileName,
    })

    const response = await fetch("https://jtestlabs.com/api/matching/jobseeker/documents/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Upload API error:", data)
      return Response.json({ error: data.message || "Upload failed" }, { status: response.status })
    }

    console.log("[v0] Upload API success:", { documentId: data.data?.id || data.id })
    return Response.json(data)
  } catch (error: any) {
    console.error("[v0] Upload API exception:", error.message)
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
