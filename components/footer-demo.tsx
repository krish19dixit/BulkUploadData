"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter } from "lucide-react"
import { useState } from "react"

export function FooterDemo() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <footer className="relative border-t border-red-500/20 bg-slate-950 text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Stay Updated</h2>
            <p className="mb-6 text-gray-400">
              Subscribe to our newsletter for the latest job opportunities and career insights.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm bg-slate-800/50 border-red-500/30 text-white placeholder-gray-500"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-red-500/10 blur-2xl" />
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block text-gray-400 transition-colors hover:text-red-500">
                Browse Jobs
              </a>
              <a href="#" className="block text-gray-400 transition-colors hover:text-red-500">
                For Employers
              </a>
              <a href="#" className="block text-gray-400 transition-colors hover:text-red-500">
                Pricing
              </a>
              <a href="#" className="block text-gray-400 transition-colors hover:text-red-500">
                How It Works
              </a>
              <a href="#" className="block text-gray-400 transition-colors hover:text-red-500">
                Contact
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-gray-400">
              <p>TopJobs Global</p>
              <p>123 Career Avenue</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: support@topjobs.com</p>
            </address>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-red-500/30 bg-slate-800/50 text-gray-400 hover:text-red-500 hover:border-red-500"
                    >
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-red-500/30 bg-slate-800/50 text-gray-400 hover:text-red-500 hover:border-red-500"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-red-500/30 bg-slate-800/50 text-gray-400 hover:text-red-500 hover:border-red-500"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-red-500/30 bg-slate-800/50 text-gray-400 hover:text-red-500 hover:border-red-500"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-red-500/20 pt-8 text-center md:flex-row">
          <p className="text-sm text-gray-400">
            © 2025 TopJobs. All rights reserved. Redefining employment through AI-powered hiring.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="text-gray-400 transition-colors hover:text-red-500">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-red-500">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-red-500">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
