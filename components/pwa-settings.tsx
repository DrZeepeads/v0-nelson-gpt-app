'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Download, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  AlertCircle,
  Trash2,
  Info
} from 'lucide-react'
import { useInstallPrompt } from '@/hooks/use-install-prompt'
import { checkServiceWorkerUpdate, unregisterServiceWorker } from '@/lib/service-worker'

export function PWASettings() {
  const { isInstallable, isInstalled, installApp } = useInstallPrompt()
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState<'checking' | 'active' | 'inactive'>('checking')

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          setServiceWorkerStatus('active')
        } else {
          setServiceWorkerStatus('inactive')
        }
      }).catch(() => {
        setServiceWorkerStatus('inactive')
      })
    } else {
      setServiceWorkerStatus('inactive')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleUpdateCheck = () => {
    checkServiceWorkerUpdate()
    setServiceWorkerStatus('checking')
    setTimeout(() => setServiceWorkerStatus('active'), 2000)
  }

  const handleUninstall = () => {
    if (confirm('Are you sure you want to unregister the service worker? This may affect offline functionality.')) {
      unregisterServiceWorker()
      setServiceWorkerStatus('inactive')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#2f2f2f] bg-[#171717]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            App Installation
          </CardTitle>
          <CardDescription className="text-[#8e8e8e]">
            Install Nelson-GPT on your device for quick access and offline capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Installation Status</p>
              <p className="text-sm text-[#8e8e8e]">
                {isInstalled ? 'App is installed on your device' : 'App can be installed on your device'}
              </p>
            </div>
            <Badge variant={isInstalled ? "default" : "secondary"}>
              {isInstalled ? (
                <><CheckCircle className="w-3 h-3 mr-1" /> Installed</>
              ) : isInstallable ? (
                <><Download className="w-3 h-3 mr-1" /> Installable</>
              ) : (
                'Not Installable'
              )}
            </Badge>
          </div>

          {!isInstalled && isInstallable && (
            <Button 
              onClick={installApp}
              className="w-full bg-white text-black hover:bg-white/90"
            >
              <Download className="w-4 h-4 mr-2" />
              Install Nelson-GPT
            </Button>
          )}

          <div className="text-xs text-[#8e8e8e] space-y-1">
            <p>• Quick access from home screen</p>
            <p>• Works offline when no internet connection</p>
            <p>• Full-screen app experience</p>
            <p>• Push notifications support</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2f2f2f] bg-[#171717]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            Connection Status
          </CardTitle>
          <CardDescription className="text-[#8e8e8e]">
            Monitor your internet connection and offline capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Network Status</p>
              <p className="text-sm text-[#8e8e8e]">
                {isOnline ? 'You are currently online' : 'You are currently offline'}
              </p>
            </div>
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>

          <div className="text-xs text-[#8e8e8e] space-y-1">
            <p>• Online: Full functionality with real-time AI responses</p>
            <p>• Offline: Limited functionality with cached responses</p>
            <p>• Automatic sync when connection is restored</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2f2f2f] bg-[#171717]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Service Worker
          </CardTitle>
          <CardDescription className="text-[#8e8e8e]">
            Manage background service that enables offline functionality and automatic updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Service Worker Status</p>
              <p className="text-sm text-[#8e8e8e]">
                {serviceWorkerStatus === 'active' && 'Service worker is running and managing offline functionality'}
                {serviceWorkerStatus === 'checking' && 'Checking service worker status...'}
                {serviceWorkerStatus === 'inactive' && 'Service worker is not active'}
              </p>
            </div>
            <Badge 
              variant={
                serviceWorkerStatus === 'active' ? 'default' : 
                serviceWorkerStatus === 'checking' ? 'secondary' : 'destructive'
              }
            >
              {serviceWorkerStatus === 'active' && <><CheckCircle className="w-3 h-3 mr-1" /> Active</>}
              {serviceWorkerStatus === 'checking' && <><RefreshCw className="w-3 h-3 mr-1" /> Checking</>}
              {serviceWorkerStatus === 'inactive' && <><AlertCircle className="w-3 h-3 mr-1" /> Inactive</>}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleUpdateCheck}
              variant="outline"
              className="flex-1"
              disabled={serviceWorkerStatus === 'checking'}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Check for Updates
            </Button>
            
            {serviceWorkerStatus === 'active' && (
              <Button 
                onClick={handleUninstall}
                variant="outline"
                className="text-red-400 border-red-400/20 hover:bg-red-400/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Unregister
              </Button>
            )}
          </div>

          <div className="text-xs text-[#8e8e8e] space-y-1">
            <p>• Caches app assets for offline use</p>
            <p>• Enables background synchronization</p>
            <p>• Provides automatic updates</p>
            <p>• Supports push notifications</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#2f2f2f] bg-[#171717]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="w-5 h-5" />
            PWA Information
          </CardTitle>
          <CardDescription className="text-[#8e8e8e]">
            Progressive Web App features and capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#8e8e8e]">Display Mode</p>
              <p className="text-white">Standalone</p>
            </div>
            <div>
              <p className="text-[#8e8e8e]">Orientation</p>
              <p className="text-white">Portrait</p>
            </div>
            <div>
              <p className="text-[#8e8e8e]">Theme Color</p>
              <p className="text-white">#212121</p>
            </div>
            <div>
              <p className="text-[#8e8e8e]">Background</p>
              <p className="text-white">#212121</p>
            </div>
          </div>

          <div className="text-xs text-[#8e8e8e] space-y-1">
            <p>• Installable on any device</p>
            <p>• Works on all modern browsers</p>
            <p>• No app store required</p>
            <p>• Always up-to-date</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}