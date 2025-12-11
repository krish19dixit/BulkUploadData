"use client"

import { WorldMap } from "@/components/ui/world-map"

export function WorldMapDemo() {
  return (
    <section className="bg-slate-950 py-24 px-6 border-t border-red-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Connect With Global Talent</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our AI-powered platform connects job seekers and employers worldwide, breaking geographical barriers to find
            the perfect match.
          </p>
        </div>

        <div className="rounded-xl overflow-hidden border border-red-500/20 bg-slate-900/50 p-8">
          <WorldMap
            dots={[
              {
                start: { lat: 40.7128, lng: -74.006, label: "New York" },
                end: { lat: 51.5074, lng: -0.1278, label: "London" },
              },
              {
                start: { lat: 51.5074, lng: -0.1278, label: "London" },
                end: { lat: 48.8566, lng: 2.3522, label: "Paris" },
              },
              {
                start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
                end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
              },
              {
                start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
                end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
              },
              {
                start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
              },
            ]}
            lineColor="#ef4444"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-900/50 border border-red-500/20 rounded-lg p-8">
            <div className="text-red-500 text-4xl font-bold mb-2">150+</div>
            <p className="text-gray-400">Countries represented in our job network</p>
          </div>
          <div className="bg-slate-900/50 border border-red-500/20 rounded-lg p-8">
            <div className="text-red-500 text-4xl font-bold mb-2">500K+</div>
            <p className="text-gray-400">Active job seekers and employers</p>
          </div>
          <div className="bg-slate-900/50 border border-red-500/20 rounded-lg p-8">
            <div className="text-red-500 text-4xl font-bold mb-2">98%</div>
            <p className="text-gray-400">Success rate in job matching</p>
          </div>
        </div>
      </div>
    </section>
  )
}
