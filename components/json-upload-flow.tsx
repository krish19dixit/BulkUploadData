"use client"

import type React from "react"

import { useState } from "react"
import { FileJson, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JSONUploadFlowProps {
  onJSONLoaded: (data: any[]) => void
}

export default function JSONUploadFlow({ onJSONLoaded }: JSONUploadFlowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const parseJSONFile = async (file: File) => {
    try {
      setIsProcessing(true)
      setError("")
      const text = await file.text()
      const data = JSON.parse(text)

      // Validate that it has resumes array
      if (!data.resumes || !Array.isArray(data.resumes)) {
        throw new Error("JSON must contain a 'resumes' array")
      }

      if (data.resumes.length === 0) {
        throw new Error("The resumes array cannot be empty")
      }

      // Extract CV data from each resume
      const cvList = data.resumes.map((resume: any) => ({
        fullName: resume.cv_json?.fullName || "Unknown",
        email: resume.cv_json?.personalInfo?.email || "",
        phone: resume.cv_json?.personalInfo?.phone || "",
        location: resume.cv_json?.personalInfo?.location || "",
        dob: resume.cv_json?.personalInfo?.dob || "",
        gender: resume.cv_json?.personalInfo?.gender || "",
        title: resume.cv_json?.title || "",
        overview: resume.cv_json?.overview || "",
        experience: resume.cv_json?.experience || [],
        education: resume.cv_json?.education || [],
        skills: resume.cv_json?.skills || [],
        languages: resume.cv_json?.languages || [],
        attachments: resume.cv_json?.attachments || [],
        originalData: resume.cv_json,
      }))

      onJSONLoaded(cvList)
    } catch (err: any) {
      setError(err.message || "Failed to parse JSON file")
      setIsProcessing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        parseJSONFile(file)
      } else {
        setError("Please upload a valid JSON file")
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      parseJSONFile(files[0])
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h2 className="text-4xl font-bold text-white">Job Seeker Onboarding Process</h2>
          <p className="text-gray-400 text-lg">
            Start by sharing bulk CV data to create job seeker accounts. This helps us set up profiles and connect you
            with the right jobs.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-red-500/30 bg-slate-900/50">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white font-bold text-sm">
            1
          </div>
          <span className="text-red-500 font-medium">Upload CVs</span>
          <span className="text-gray-500">→</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-400 font-bold text-sm">
            2
          </div>
          <span className="text-gray-400 font-medium">Register</span>
          <span className="text-gray-500">→</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-500 text-gray-400 font-bold text-sm">
            3
          </div>
          <span className="text-gray-400 font-medium">Process</span>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all ${
            isDragging ? "border-red-500 bg-red-500/5" : "border-gray-600 bg-slate-900/30"
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30">
              <FileJson className="h-8 w-8 text-red-500" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Upload JSON File with CVs</h3>
              <p className="text-gray-400 text-sm mb-4">
                Drag and drop your JSON file here, or click to browse. The file should contain a "resumes" array with
                multiple CV objects.
              </p>
              <p className="text-gray-500 text-xs italic mb-6">
                Example format: {JSON.stringify({ resumes: [{ cv_json: { fullName: "John Doe" } }] }, null, 2)}
              </p>
            </div>

            <label>
              <input
                type="file"
                accept=".json"
                onChange={handleFileInputChange}
                disabled={isProcessing}
                className="hidden"
              />
              <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3" disabled={isProcessing} asChild>
                <span>{isProcessing ? "Processing..." : "Browse File"}</span>
              </Button>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-500">Error</p>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Sample Data Button */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Want to try with sample data?</p>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-slate-800 bg-transparent"
            onClick={() => {
              // Sample data for testing
              const sampleData = {
                resumes: [
                  {
                    cv_json: {
                      fullName: "Fatima Khan",
                      title: "Digital Marketing Specialist",
                      personalInfo: {
                        email: "fatima.khan@dmhub.ae",
                        phone: "(+971) 58 456 7890",
                        location: "Abu Dhabi, UAE",
                        dob: "04 December, 1996",
                        gender: "Female",
                      },
                      overview: "Creative and analytical digital marketer with expertise in paid ads",
                      experience: [
                        { company: "DM Hub", title: "Digital Marketing Specialist", period: "Jan 2022 – Present" },
                      ],
                      education: [{ institution: "Zayed University", degree: "BSc in Digital Communication" }],
                      skills: ["Google Ads", "Meta Ads", "Email Marketing", "SEO"],
                      languages: ["English: Fluent", "Urdu: Native", "Arabic: Basic"],
                    },
                  },
                  {
                    cv_json: {
                      fullName: "Omar Al Sheikh",
                      title: "Sales Executive",
                      personalInfo: {
                        email: "omar.sheikh@sellpro.ae",
                        phone: "(+971) 50 998 7744",
                        location: "Sharjah, UAE",
                        dob: "19 August, 1992",
                        gender: "Male",
                      },
                      overview: "Goal-driven sales executive with proven record of exceeding targets",
                      experience: [
                        { company: "SellPro Electronics", title: "Sales Executive", period: "March 2021 – Present" },
                      ],
                      education: [{ institution: "University of Sharjah", degree: "BBA in Sales & Marketing" }],
                      skills: ["Sales Strategy", "Lead Generation", "Negotiation", "CRM (Salesforce)"],
                      languages: ["Arabic: Native", "English: Professional"],
                    },
                  },
                ],
              }
              onJSONLoaded(
                sampleData.resumes.map((resume: any) => ({
                  fullName: resume.cv_json?.fullName || "Unknown",
                  email: resume.cv_json?.personalInfo?.email || "",
                  phone: resume.cv_json?.personalInfo?.phone || "",
                  location: resume.cv_json?.personalInfo?.location || "",
                  dob: resume.cv_json?.personalInfo?.dob || "",
                  gender: resume.cv_json?.personalInfo?.gender || "",
                  title: resume.cv_json?.title || "",
                  overview: resume.cv_json?.overview || "",
                  experience: resume.cv_json?.experience || [],
                  education: resume.cv_json?.education || [],
                  skills: resume.cv_json?.skills || [],
                  languages: resume.cv_json?.languages || [],
                  attachments: resume.cv_json?.attachments || [],
                  originalData: resume.cv_json,
                })),
              )
            }}
          >
            Load Sample CVs
          </Button>
        </div>
      </div>
    </div>
  )
}
