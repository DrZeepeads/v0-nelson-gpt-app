"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false)
  const [keyboardNav, setKeyboardNav] = useState(true)

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <header className="border-b border-[#2f2f2f] px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-[#2f2f2f]">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Accessibility Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
            <div>
              <Label className="font-medium">High Contrast Mode</Label>
              <p className="text-sm text-[#8e8e8e]">Increase contrast for better visibility</p>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
            <div>
              <Label className="font-medium">Keyboard Navigation</Label>
              <p className="text-sm text-[#8e8e8e]">Enable keyboard shortcuts and navigation</p>
            </div>
            <Switch checked={keyboardNav} onCheckedChange={setKeyboardNav} />
          </div>

          <div className="rounded-lg border border-[#2f2f2f] bg-[#2f2f2f] p-4">
            <h3 className="mb-3 font-semibold">Keyboard Shortcuts</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#8e8e8e]">Send message</span>
                <kbd className="rounded bg-[#3f3f3f] px-2 py-1">Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8e8e]">New line</span>
                <kbd className="rounded bg-[#3f3f3f] px-2 py-1">Shift + Enter</kbd>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8e8e8e]">New chat</span>
                <kbd className="rounded bg-[#3f3f3f] px-2 py-1">Ctrl + N</kbd>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-[#2f2f2f] hover:bg-[#2f2f2f] bg-transparent"
            onClick={() => {
              setHighContrast(false)
              setKeyboardNav(true)
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  )
}
