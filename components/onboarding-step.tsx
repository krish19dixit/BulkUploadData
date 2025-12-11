"use client"

import { Check } from "lucide-react"

interface OnboardingStepProps {
  cv: {
    id: string
    fullName: string
    email: string
    phone: string
    location: string
    title: string
    overview: string
    experience: any[]
    education: any[]
    skills: string[]
    languages: string[]
    status: string
    userId?: string
    documentId?: string
  }
}

export default function OnboardingStep({ cv }: OnboardingStepProps) {
  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
          ✓
        </div>
        <span className="text-red-500 font-medium">Attachment</span>
        <span className="text-gray-500">→</span>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-gray-400 text-xs font-bold">
          ✓
        </div>
        <span className="text-gray-400 font-medium">General Info</span>
        <span className="text-gray-500">→</span>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-gray-400 text-xs font-bold">
          ✓
        </div>
        <span className="text-gray-400 font-medium">Verification</span>
        <span className="text-gray-500">→</span>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-gray-400 text-xs font-bold">
          ✓
        </div>
        <span className="text-gray-400 font-medium">Credential</span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Profile Info */}
        <div>
          <h4 className="font-semibold text-white mb-3">Profile Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Full Name</label>
              <p className="text-white font-medium">{cv.fullName}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Email</label>
              <p className="text-white font-medium">{cv.email}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Phone</label>
              <p className="text-white font-medium">{cv.phone}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Location</label>
              <p className="text-white font-medium">{cv.location}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400">Professional Title</label>
              <p className="text-white font-medium">{cv.title}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        {cv.skills && cv.skills.length > 0 && (
          <div>
            <h4 className="font-semibold text-white mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {cv.skills.slice(0, 5).map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                  {skill}
                </span>
              ))}
              {cv.skills.length > 5 && (
                <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm">
                  +{cv.skills.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Experience */}
        {cv.experience && cv.experience.length > 0 && (
          <div>
            <h4 className="font-semibold text-white mb-3">Experience</h4>
            <div className="space-y-2">
              {cv.experience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="text-sm">
                  <p className="text-white font-medium">
                    {exp.title} at {exp.company}
                  </p>
                  <p className="text-gray-400 text-xs">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
        <Check className="h-4 w-4 text-green-500" />
        <div>
          <p className="text-sm font-medium text-green-500">Successfully Processed</p>
          <p className="text-xs text-green-400">
            {cv.userId && `User ID: ${cv.userId.substring(0, 8)}...`}
            {cv.documentId && ` | Document ID: ${cv.documentId.substring(0, 8)}...`}
          </p>
        </div>
      </div>
    </div>
  )
}
