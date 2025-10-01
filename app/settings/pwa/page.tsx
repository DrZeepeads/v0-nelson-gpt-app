import { PWASettings } from "@/components/pwa-settings"

export default function PWASettingsPage() {
  return (
    <div className="min-h-screen bg-[#212121] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PWA Settings</h1>
          <p className="text-[#8e8e8e]">
            Manage Progressive Web App features, installation, and offline capabilities.
          </p>
        </div>
        
        <PWASettings />
      </div>
    </div>
  )
}