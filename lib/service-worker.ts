'use client'

import { useEffect } from 'react'

export function useServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register the service worker
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
          })
          
          console.log('Service Worker registered with scope:', registration.scope)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const installingWorker = registration.installing
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('New version available')
                  // You could show a notification to the user here
                }
              })
            }
          })
          
          // Handle service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('Service Worker message:', event.data)
          })
          
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }
      
      // Wait for the page to load before registering
      if (document.readyState === 'complete') {
        registerServiceWorker()
      } else {
        window.addEventListener('load', registerServiceWorker)
      }
      
      // Cleanup
      return () => {
        window.removeEventListener('load', registerServiceWorker)
      }
    }
  }, [])
}

export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister()
    }).catch((error) => {
      console.error('Service Worker unregistration failed:', error)
    })
  }
}

export function checkServiceWorkerUpdate() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update()
    }).catch((error) => {
      console.error('Service Worker update check failed:', error)
    })
  }
}