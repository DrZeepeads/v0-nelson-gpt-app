'use client'

import { useEffect, useState } from 'react'
import { useServiceWorker } from '@/lib/service-worker'

interface ServiceWorkerContextType {
  isOnline: boolean
  isServiceWorkerSupported: boolean
  isUpdateAvailable: boolean
  updateServiceWorker: () => void
  offlineReady: boolean
}

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false)

  useServiceWorker()

  useEffect(() => {
    // Check if service worker is supported
    setIsServiceWorkerSupported('serviceWorker' in navigator)

    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial check
    setIsOnline(navigator.onLine)

    // Service worker update handling
    const handleServiceWorkerUpdate = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        setIsUpdateAvailable(true)
      }
      
      if (event.data && event.data.type === 'OFFLINE_READY') {
        setOfflineReady(true)
      }
    }

    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerUpdate)

    // Check for service worker updates periodically
    const updateInterval = setInterval(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistration().then((registration) => {
          registration?.update()
        })
      }
    }, 60 * 60 * 1000) // Check every hour

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerUpdate)
      clearInterval(updateInterval)
    }
  }, [])

  const updateServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          registration.waiting.postMessage({ type: 'CLAIM_CLIENTS' })
          window.location.reload()
        }
      })
    }
  }

  // Show update notification
  useEffect(() => {
    if (isUpdateAvailable) {
      const shouldUpdate = window.confirm(
        'A new version of Nelson-GPT is available. Would you like to update now?'
      )
      if (shouldUpdate) {
        updateServiceWorker()
      }
    }
  }, [isUpdateAvailable])

  // Show offline ready notification
  useEffect(() => {
    if (offlineReady) {
      const notification = document.createElement('div')
      notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2'
      notification.textContent = 'Nelson-GPT is now available offline!'
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
      }, 5000)
    }
  }, [offlineReady])

  // Show offline status
  useEffect(() => {
    if (!isOnline) {
      const notification = document.createElement('div')
      notification.className = 'fixed bottom-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2'
      notification.textContent = 'You are currently offline'
      document.body.appendChild(notification)

      return () => {
        notification.remove()
      }
    }
  }, [isOnline])

  return <>{children}</>
}