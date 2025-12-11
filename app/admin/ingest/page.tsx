"use client"

import { useState } from "react"
import Header from "@/components/header"
import JSONUploadFlow from "@/components/json-upload-flow"
import OnboardingWorkflow from "@/components/onboarding-workflow"

export default function AdminIngestPage() {
  const [cvData, setCvData] = useState<any[] | null>(null)

  const handleJSONLoaded = (data: any[]) => {
    setCvData(data)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      {!cvData ? (
        <JSONUploadFlow onJSONLoaded={handleJSONLoaded} />
      ) : (
        <OnboardingWorkflow cvList={cvData} onReset={() => setCvData(null)} />
      )}
    </main>
  )
}
