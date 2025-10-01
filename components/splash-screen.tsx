"use client"

import { useEffect, useState } from "react"
import { Stethoscope } from "lucide-react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-br from-[#0f4c81] via-[#1a5f9e] to-[#2563eb] p-8 animate-in fade-in duration-500">
      {/* Main Content - Centered */}
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="mb-8 animate-in zoom-in duration-700 delay-100">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-white/20 blur-2xl" />
            <div className="relative flex size-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-2 ring-white/30 sm:size-28">
              <Stethoscope className="size-12 text-white sm:size-14" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 animate-in slide-in-from-bottom-4 text-balance font-sans text-5xl font-bold tracking-tight text-white duration-700 delay-300 sm:text-6xl md:text-7xl">
          Nelson-GPT
        </h1>

        {/* Subtitle */}
        <p className="animate-in slide-in-from-bottom-4 text-balance text-xl font-medium text-white/90 duration-700 delay-500 sm:text-2xl">
          Smart Pediatric Assistant
        </p>

        {/* Loading Indicator */}
        <div className="mt-12 animate-in fade-in duration-700 delay-700">
          <div className="flex gap-2">
            <div className="size-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.3s]" />
            <div className="size-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.15s]" />
            <div className="size-2 animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="animate-in slide-in-from-bottom-2 text-center duration-700 delay-1000">
        <p className="text-balance text-sm font-medium text-white/70 sm:text-base">
          Powered by Nelson Textbook of Pediatrics
        </p>
      </div>
    </div>
  )
}
