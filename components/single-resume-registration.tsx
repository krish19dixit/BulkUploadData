"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface RegistrationState {
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
}

export default function SingleResumeRegistration() {
  const [formData, setFormData] = useState<RegistrationState>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    dob: "",
    gender: "",
    title: "",
    overview: "",
    experience: [],
    education: [],
    skills: [],
    languages: [],
  })

  const [status, setStatus] = useState<"form" | "registering" | "registered" | "uploading" | "completed" | "error">(
    "form",
  )
  const [error, setError] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [cvData, setCvData] = useState<RegistrationState | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email) {
      setError("Full Name and Email are required")
      return
    }

    setStatus("registering")
    setError("")

    try {
      // Call register API
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
          location: formData.location,
          dob: formData.dob,
          gender: formData.gender,
          title: formData.title,
          overview: formData.overview,
          experience: formData.experience,
          education: formData.education,
          skills: formData.skills,
          languages: formData.languages,
        }),
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        throw new Error(registerData.error || "Registration failed")
      }

      const newUserId = registerData.data?.id || registerData.id
      setUserId(newUserId)
      setCvData(formData)

      console.log("[v0] Registered user:", formData.fullName, "User ID:", newUserId)

      // Automatically start upload
      setStatus("uploading")

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: newUserId,
          documentType: "resume",
          fileName: `${formData.fullName.replace(/\s+/g, "_")}_resume.json`,
          fileContent: JSON.stringify(formData),
          mimeType: "application/json",
        }),
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Upload failed")
      }

      console.log("[v0] Uploaded document, Document ID:", uploadData.data?.id || uploadData.id)
      setStatus("completed")
    } catch (err: any) {
      console.error("[v0] Error:", err.message)
      setError(err.message)
      setStatus("error")
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      dob: "",
      gender: "",
      title: "",
      overview: "",
      experience: [],
      education: [],
      skills: [],
      languages: [],
    })
    setStatus("form")
    setError("")
    setUserId("")
    setCvData(null)
  }

  if (status === "completed" && cvData) {
    return (
      <div className="px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-red-500/30 bg-slate-900/50 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              <div>
                <h2 className="text-2xl font-bold text-white">Registration Completed</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {cvData.fullName} has been successfully registered and CV uploaded
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-xs">User ID</p>
                <p className="text-white font-mono text-sm mt-1 truncate">{userId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Email</p>
                <p className="text-white text-sm mt-1">{cvData.email}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white flex-1" onClick={handleReset}>
              Register Another Resume
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (status === "registering" || status === "uploading") {
    return (
      <div className="px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-blue-500/30 bg-slate-900/50 p-8 text-center">
            <Clock className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              {status === "registering" ? "Registering Resume..." : "Uploading CV..."}
            </h2>
            <p className="text-gray-400">Please wait while we process your submission</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="px-6 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-red-500">Registration Failed</h2>
                <p className="text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white flex-1" onClick={handleReset}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Job Seeker <span className="text-red-500">Registration</span>
          </h1>
          <p className="text-gray-400 mt-2">Register your resume and we'll match you with the best job opportunities</p>
        </div>

        {/* Form */}
        <div className="rounded-lg border border-red-500/30 bg-slate-900/50 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Skills (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  }))
                }
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                placeholder="JavaScript, React, Node.js"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Professional Overview</label>
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              placeholder="Tell us about your professional background and experience..."
            />
          </div>

          {error && (
            <div className="flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white flex-1" onClick={handleRegister}>
              Register Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
