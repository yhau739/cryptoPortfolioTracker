"use client"

import { useEffect, useState } from "react"
import { Loader2, Settings, AlertTriangle } from "lucide-react"
import { Card } from "../ui/card"

export default function MaintenancePage() {
  const [dots, setDots] = useState(".")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    // <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <Card className="max-w-3xl w-full from-sky-50 to-indigo-50 rounded-xl shadow-lg p-8 md:p-12 relative overflow-hidden">
        {/* Animated gears in background */}
        <div className="absolute -right-8 -top-8 text-sky-100 opacity-80 animate-spin-slow">
          <Settings size={120} />
        </div>
        <div className="absolute -left-10 -bottom-10 text-indigo-100 opacity-80 animate-spin-reverse">
          <Settings size={100} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-amber-500 mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Maintenance in Progress</h1>
          </div>

          <div className="space-y-6 text-center">
            <p className="text-lg text-gray-600">
              We're currently upgrading our systems to bring you an even better crypto tracking experience.
            </p>

            <div className="flex items-center justify-center py-4">
              <div className="relative flex items-center justify-center h-24 w-24">
                <Loader2 className="h-16 w-16 text-sky-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-sky-600"></div>
                </div>
              </div>
            </div>

            <div className="font-mono text-lg font-semibold text-gray-700">
              <span>Working on updates{dots}</span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-gray-500">We'll be back online shortly. Thank you for your patience!</p>
              <p className="mt-2 text-sm text-gray-400">Expected completion: Soon</p>
            </div>
          </div>
        </div>
      </Card>
    // </div>
  )
}
