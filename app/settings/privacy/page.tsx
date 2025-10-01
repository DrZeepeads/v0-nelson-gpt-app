"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PrivacySettings() {
  const [autoBackup, setAutoBackup] = useState(true)
  const [retention, setRetention] = useState("30")

  const handleExportData = () => {
    const chats = localStorage.getItem("nelson-gpt-chats")
    if (chats) {
      const blob = new Blob([chats], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `nelson-gpt-backup-${new Date().toISOString()}.json`
      a.click()
    }
  }

  const handleDeleteAllData = () => {
    localStorage.removeItem("nelson-gpt-chats")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-[#212121] text-white">
      <header className="border-b border-[#2f2f2f] px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-[#2f2f2f]">
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Privacy Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-[#2f2f2f] p-4">
            <div>
              <Label className="font-medium">Automatic Backup</Label>
              <p className="text-sm text-[#8e8e8e]">Automatically backup conversations</p>
            </div>
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          </div>

          <div className="space-y-3 rounded-lg border border-[#2f2f2f] p-4">
            <Label className="font-medium">Data Retention</Label>
            <p className="text-sm text-[#8e8e8e]">How long to keep conversation history</p>
            <Select value={retention} onValueChange={setRetention}>
              <SelectTrigger className="bg-[#2f2f2f] border-[#3f3f3f]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2f2f2f] border-[#3f3f3f]">
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="forever">Forever</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-[#2f2f2f] hover:bg-[#2f2f2f] bg-transparent"
              onClick={handleExportData}
            >
              <Download className="size-4" />
              Export All Data
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 border-red-900/50 text-red-400 hover:bg-red-900/20 bg-transparent"
                >
                  <Trash2 className="size-4" />
                  Delete All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#2f2f2f] border-[#3f3f3f]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-[#8e8e8e]">
                    This action cannot be undone. This will permanently delete all your conversations and data from this
                    device.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-transparent border-[#3f3f3f] hover:bg-[#3f3f3f]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAllData} className="bg-red-600 hover:bg-red-700">
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </main>
    </div>
  )
}
