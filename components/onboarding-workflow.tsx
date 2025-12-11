"use client"

import { useState, useEffect } from "react"
import { ChevronDown, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import OnboardingStep from "@/components/onboarding-step"

interface CV {
  fullName: string
  email: string
  phone: string
  location: string
  dob: string
  gender: string
  title: string
  overview: string
  experience: any[]
  education: any[]
  skills: string[]
  languages: string[]
  attachments: any[]
  originalData: any
}

interface CVWithStatus extends CV {
  id: string
  status: "pending" | "registering" | "registered" | "uploading" | "completed" | "error"
  error?: string
  userId?: string
  documentId?: string
}

interface OnboardingWorkflowProps {
  cvList: CV[]
  onReset: () => void
}

export default function OnboardingWorkflow({ cvList, onReset }: OnboardingWorkflowProps) {
  const [cvs, setCvs] = useState<CVWithStatus[]>(
    cvList.map((cv, idx) => ({
      ...cv,
      id: `cv-${idx}`,
      status: "pending",
    })),
  )

  const [expandedCvId, setExpandedCvId] = useState<string | null>(cvList.length === 1 ? `cv-0` : null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Auto-start processing
  useEffect(() => {
    if (!isProcessing && cvs.some((cv) => cv.status === "pending")) {
      startBulkProcessing()
    }
  }, [])

  const startBulkProcessing = async () => {
    setIsProcessing(true)

    for (let i = 0; i < cvs.length; i++) {
      const cv = cvs[i]
      if (cv.status === "pending") {
        try {
          setCvs((prev) => prev.map((c) => (c.id === cv.id ? { ...c, status: "registering" } : c)))

          const registerResponse = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: cv.email,
              fullName: cv.fullName,
              phone: cv.phone,
              location: cv.location,
              dob: cv.dob,
              gender: cv.gender,
              title: cv.title,
              overview: cv.overview,
            }),
          })

          const registerData = await registerResponse.json()

          if (!registerResponse.ok) {
            throw new Error(registerData.error || `Registration failed: ${registerResponse.statusText}`)
          }

          const userId = registerData.data?.id || registerData.id

          console.log("[v0] Registered CV:", cv.fullName, "User ID:", userId)

          setCvs((prev) => prev.map((c) => (c.id === cv.id ? { ...c, status: "uploading", userId } : c)))

          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
              documentType: "resume",
              fileName: `${cv.fullName.replace(/\s+/g, "_")}_resume.pdf`,
              fileContent: JSON.stringify(cv.originalData),
              mimeType: "application/json",
            }),
          })

          const uploadData = await uploadResponse.json()

          if (!uploadResponse.ok) {
            throw new Error(uploadData.error || `Upload failed: ${uploadResponse.statusText}`)
          }

          const documentId = uploadData.data?.id || uploadData.id

          console.log("[v0] Uploaded CV:", cv.fullName, "Document ID:", documentId)

          setCvs((prev) => prev.map((c) => (c.id === cv.id ? { ...c, status: "completed", userId, documentId } : c)))
        } catch (error: any) {
          console.error("[v0] Error processing CV:", cv.fullName, error.message)

          setCvs((prev) => prev.map((c) => (c.id === cv.id ? { ...c, status: "error", error: error.message } : c)))
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsProcessing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "registering":
      case "uploading":
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "registering":
        return "Registering..."
      case "uploading":
        return "Uploading CV..."
      case "error":
        return "Error"
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  const completedCount = cvs.filter((cv) => cv.status === "completed").length
  const errorCount = cvs.filter((cv) => cv.status === "error").length

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8 rounded-lg border border-red-500/30 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Processing CVs</h2>
              <p className="text-gray-400 text-sm">
                Automatically registering and uploading {cvs.length} candidate profiles
              </p>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <div className="text-3xl font-bold text-green-500">{completedCount}</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">
                  {cvs.filter((c) => c.status === "registering" || c.status === "uploading").length}
                </div>
                <div className="text-xs text-gray-400">Processing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-500">{errorCount}</div>
                <div className="text-xs text-gray-400">Errors</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
              style={{ width: `${(completedCount / cvs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* CV List */}
        <div className="space-y-3">
          {cvs.map((cv) => (
            <div key={cv.id} className="rounded-lg border border-gray-700 bg-slate-900/50 overflow-hidden">
              {/* CV Item Header */}
              <button
                onClick={() => setExpandedCvId(expandedCvId === cv.id ? null : cv.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-shrink-0">{getStatusIcon(cv.status)}</div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{cv.fullName}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">{cv.title}</span>
                  </div>
                  <p className="text-sm text-gray-400">{cv.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${cv.status === "error" ? "text-red-500" : "text-gray-400"}`}>
                    {getStatusText(cv.status)}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      expandedCvId === cv.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {expandedCvId === cv.id && (
                <div className="border-t border-gray-700 p-4 bg-slate-950/50">
                  {cv.status === "error" ? (
                    <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-red-500">Processing Error</p>
                        <p className="text-sm text-red-400 mt-1">{cv.error}</p>
                      </div>
                    </div>
                  ) : (
                    <OnboardingStep cv={cv} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        {completedCount === cvs.length || errorCount > 0 ? (
          <div className="mt-8 flex gap-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white flex-1" onClick={onReset}>
              ← Back to Upload
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-slate-800 flex-1 bg-transparent"
              onClick={() => {
                setCvs((prev) => prev.map((cv) => (cv.status === "error" ? { ...cv, status: "pending" } : cv)))
              }}
              disabled={errorCount === 0}
            >
              Retry Failed ({errorCount})
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
