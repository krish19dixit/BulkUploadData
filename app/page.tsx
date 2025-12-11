"use client"

import { useRouter } from "next/navigation"
import { Globe, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { WorldMapDemo } from "@/components/world-map-demo"
import { FooterDemo } from "@/components/footer-demo"

export default function HomePage() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(true)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation Header */}
      <header className="border-b border-red-500/20 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 border border-red-400">
              <span className="text-sm font-bold text-white">TJ</span>
            </div>
            <span className="font-bold text-white text-lg">TOPJOBS</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-red-500 font-medium hover:text-red-400 transition">
              Home
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Products
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Features
            </a>
            <a
              href="#"
              className="text-red-500 border border-red-500 px-3 py-1 rounded font-medium hover:bg-red-500/10 transition"
            >
              Coming Soon
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Resources
            </a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10 bg-transparent">
              Login
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Register</Button>
            <Button variant="ghost" className="text-red-500 hover:text-red-400">
              For Employers →
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">Redefine the employment</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Empowering workforce and businesses with smart, seamless hiring—rooted in culture, driven by AI
            </p>

            {/* Search Bar */}
            <div className="flex gap-4 mt-8">
              <input
                type="text"
                placeholder="Job title, Keyword..."
                className="flex-1 bg-slate-800/50 border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <input
                type="text"
                placeholder="Your Location"
                className="flex-1 bg-slate-800/50 border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition">
                search
              </button>
            </div>

            {/* Get Started Button */}
            <div className="pt-4">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg h-auto"
                onClick={() => router.push("/admin/ingest")}
              >
                Get Started →
              </Button>
            </div>
          </div>

          {/* Right Side - Professional Image + Decorative Elements */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Decorative Red Circle */}
            <div className="absolute top-0 right-20 w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-30" />

            {/* Professional Image Card */}
            <div className="relative z-10 bg-slate-800/50 border border-red-500/30 rounded-xl p-2 w-full max-w-xs">
              <img
                src="/professional-man-with-laptop-business-attire.jpg"
                alt="Professional"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">Effortless Hiring</h3>
                  <Button className="bg-transparent border border-white text-white hover:bg-white/10">
                    Hire Top Talent
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circuit Pattern Background - Decorative */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
      </section>

      {/* WorldMapDemo Section */}
      <WorldMapDemo />

      {/* Bottom Section */}
      <div className="flex justify-center items-center py-12 gap-3 bg-slate-900/50 border-t border-red-500/20">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-red-500/30">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-gray-300 text-sm">Combining AI With Human Expertise</span>
        </div>
      </div>

      {/* FooterDemo Component */}
      <FooterDemo />
    </main>
  )
}
