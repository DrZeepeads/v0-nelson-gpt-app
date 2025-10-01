"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationSettings() {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [frequency, setFrequency] = useState("all")

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <header className="border-b border-[#2f2f2f] px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-[#2f2f2f]">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Notification Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
            <div>
              <Label className="font-medium">Push Notifications</Label>
              <p className="text-sm text-[#8e8e8e]">Receive notifications for new messages</p>
            </div>
            <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
            <div>
              <Label className="font-medium">Sound</Label>
              <p className="text-sm text-[#8e8e8e]">Play sound for notifications</p>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="space-y-3 rounded-lg border border-[#2f2f2f] p-4">
            <Label className="font-medium">Notification Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="bg-[#2f2f2f] border-[#3f3f3f]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2f2f2f] border-[#3f3f3f]">
                <SelectItem value="all">All messages</SelectItem>
                <SelectItem value="mentions">Mentions only</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full border-[#2f2f2f] hover:bg-[#2f2f2f] bg-transparent"
            onClick={() => {
              setPushEnabled(true)
              setSoundEnabled(true)
              setFrequency("all")
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </main>
    </div>
  )
}
