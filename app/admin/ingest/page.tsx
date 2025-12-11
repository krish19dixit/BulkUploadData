"use client"

import { useState } from "react"
import Header from "@/components/header"
import JSONUploadFlow from "@/components/json-upload-flow"
import OnboardingWorkflow from "@/components/onboarding-workflow"
import SingleResumeRegistration from "@/components/single-resume-registration"

export default function AdminIngestPage() {
  const [mode, setMode] = useState<"choice" | "bulk" | "single">("choice")
  const [cvData, setCvData] = useState<any[] | null>(null)

  const handleJSONLoaded = (data: any[]) => {
    setCvData(data)
  }

  if (mode === "choice") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <div className="px-6 py-16">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Resume <span className="text-red-500">Ingestion</span>
              </h1>
              <p className="text-gray-400">Choose how you want to register and upload your resume</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Single Resume */}
              <div
                onClick={() => setMode("single")}
                className="cursor-pointer rounded-lg border border-red-500/30 bg-slate-900/50 p-8 hover:bg-slate-900/70 transition-colors"
              >
                <div className="text-4xl mb-4">👤</div>
                <h2 className="text-xl font-bold text-white mb-2">Single Resume</h2>
                <p className="text-gray-400 text-sm">Register and upload one resume at a time with all the details</p>
              </div>

              {/* Bulk Upload */}
              <div
                onClick={() => setMode("bulk")}
                className="cursor-pointer rounded-lg border border-red-500/30 bg-slate-900/50 p-8 hover:bg-slate-900/70 transition-colors"
              >
                <div className="text-4xl mb-4">📦</div>
                <h2 className="text-xl font-bold text-white mb-2">Bulk Upload</h2>
                <p className="text-gray-400 text-sm">Upload multiple resumes at once using a JSON file</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <div className="mb-6 px-6 py-4">
        <button
          onClick={() => {
            setMode("choice")
            setCvData(null)
          }}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
        >
          ← Back to Selection
        </button>
      </div>
      {mode === "bulk" ? (
        <>
          {!cvData ? (
            <JSONUploadFlow onJSONLoaded={handleJSONLoaded} />
          ) : (
            <OnboardingWorkflow cvList={cvData} onReset={() => setCvData(null)} />
          )}
        </>
      ) : (
        <SingleResumeRegistration />
      )}
    </main>
  )
}
