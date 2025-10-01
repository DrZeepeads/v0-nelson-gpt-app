'use client'

import { Button } from '@/components/ui/button'
import { Download, X, Smartphone } from 'lucide-react'
import { useInstallPrompt } from '@/hooks/use-install-prompt'

export function InstallPrompt() {
  const { isInstallable, installApp, dismissInstallPrompt } = useInstallPrompt()

  if (!isInstallable) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-[#2f2f2f] border border-[#3f3f3f] rounded-lg p-4 shadow-lg z-50 animate-in slide-in-from-bottom-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-[#212121] rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">
            Install Nelson-GPT
          </h3>
          <p className="text-xs text-[#8e8e8e] leading-relaxed">
            Get quick access to your pediatric assistant by installing this app on your device.
          </p>
          
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={installApp}
              className="bg-white text-black hover:bg-white/90 text-xs px-3 py-1.5 h-auto"
            >
              <Download className="w-3 h-3 mr-1" />
              Install
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={dismissInstallPrompt}
              className="text-xs text-[#8e8e8e] hover:text-white hover:bg-[#3f3f3f] px-3 py-1.5 h-auto"
            >
              Maybe later
            </Button>
          </div>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          onClick={dismissInstallPrompt}
          className="flex-shrink-0 w-6 h-6 text-[#8e8e8e] hover:text-white hover:bg-[#3f3f3f]"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}