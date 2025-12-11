"use client"

import Link from "next/link"
import { Globe, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-red-500/20 bg-slate-950/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 border border-red-400">
            <span className="text-sm font-bold text-white">TJ</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">TopJobs</h1>
            <p className="text-xs text-gray-400">Admin Bulk Ingest</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
            <Globe className="h-4 w-4" />
            <span className="text-sm">English</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
