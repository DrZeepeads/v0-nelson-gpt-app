"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AppearanceSettings() {
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <header className="border-b border-[#2f2f2f] px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-[#2f2f2f]">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Appearance Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-8">
          {/* Font Size */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Font Size</Label>
              <p className="mt-1 text-sm text-[#8e8e8e]">Adjust the text size throughout the app</p>
            </div>
            <div className="space-y-4">
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-[#8e8e8e]">
                <span>12px</span>
                <span className="font-semibold text-white">{fontSize}px</span>
                <span>24px</span>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">Theme</Label>
              <p className="mt-1 text-sm text-[#8e8e8e]">Choose your preferred color scheme</p>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-[#8e8e8e]">Use dark theme throughout the app</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Preview</Label>
            <div className="rounded-lg border border-[#2f2f2f] bg-[#f7f7f8] p-6">
              <p className="text-[#1f1f1f]" style={{ fontSize: `${fontSize}px` }}>
                This is how your text will appear with the current settings. The quick brown fox jumps over the lazy
                dog.
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <Button
            variant="outline"
            className="w-full border-[#2f2f2f] hover:bg-[#2f2f2f] bg-transparent"
            onClick={() => {
              setFontSize(16)
              setDarkMode(true)
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  )
}
