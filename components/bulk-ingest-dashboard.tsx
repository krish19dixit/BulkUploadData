"use client"

import { useState } from "react"
import FileUploadZone from "@/components/file-upload-zone"
import ProcessingDashboard from "@/components/processing-dashboard"
import ProgressOverview from "@/components/progress-overview"

export default function BulkIngestDashboard() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [processingStarted, setProcessingStarted] = useState(false)

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleStartProcessing = () => {
    if (uploadedFiles.length > 0) {
      setProcessingStarted(true)
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Bulk CV Ingestion</h2>
          <p className="text-muted-foreground">
            Upload and process multiple resumes in batch. Supports PDF, DOCX, and text formats.
          </p>
        </div>

        {!processingStarted ? (
          <>
            {/* Upload Zone */}
            <FileUploadZone onFilesSelected={handleFilesSelected} uploadedCount={uploadedFiles.length} />

            {/* File List Preview */}
            {uploadedFiles.length > 0 && (
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Queued Files ({uploadedFiles.length})</h3>
                  <button
                    onClick={() => setUploadedFiles([])}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between rounded-md bg-secondary/30 px-4 py-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <div className="h-2 w-24 rounded-full bg-border">
                        <div className="h-full w-full rounded-full bg-primary" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleStartProcessing}
                    className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Start Processing ({uploadedFiles.length} files)
                  </button>
                  <button className="rounded-lg border border-border bg-transparent px-6 py-3 font-semibold text-foreground hover:bg-secondary/30 transition-colors">
                    Save & Continue Later
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <ProgressOverview fileCount={uploadedFiles.length} />
            <ProcessingDashboard files={uploadedFiles} />
          </>
        )}
      </div>
    </div>
  )
}
