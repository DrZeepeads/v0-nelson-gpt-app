const CACHE_NAME = 'nelson-gpt-v1'
const ASSETS_CACHE = 'nelson-gpt-assets-v1'
const API_CACHE = 'nelson-gpt-api-v1'

// URLs to cache on install
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192.jpg',
  '/icon-512.jpg',
  '/placeholder-logo.png',
  '/placeholder-logo.svg',
  '/placeholder-user.jpg',
  '/placeholder.jpg',
  '/placeholder.svg',
  '/splash-screen.jpg'
]

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  event.waitUntil(
    caches.open(ASSETS_CACHE)
      .then((cache) => {
        console.log('Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== ASSETS_CACHE && cacheName !== API_CACHE && cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Skip non-HTTP requests
  if (!event.request.url.startsWith('http')) {
    return
  }

  // Handle different request types
  if (event.request.mode === 'navigate') {
    // Handle navigation requests
    event.respondWith(handleNavigationRequest(event.request))
  } else if (event.request.destination === 'image') {
    // Handle image requests
    event.respondWith(handleImageRequest(event.request))
  } else if (event.request.destination === 'script' || event.request.destination === 'style') {
    // Handle CSS and JS requests
    event.respondWith(handleAssetRequest(event.request))
  } else if (url.pathname.startsWith('/api/')) {
    // Handle API requests
    event.respondWith(handleApiRequest(event.request))
  } else {
    // Handle other requests
    event.respondWith(handleFetchRequest(event.request))
  }
})

// Navigation request handler (Cache First)
async function handleNavigationRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If not in cache, try network
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(ASSETS_CACHE)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }

    // If network fails, return offline page
    return getOfflinePage()
  } catch (error) {
    console.log('Navigation request failed:', error)
    return getOfflinePage()
  }
}

// Image request handler (Cache First)
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(ASSETS_CACHE)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }

    // Return placeholder image if network fails
    return getPlaceholderImage()
  } catch (error) {
    console.log('Image request failed:', error)
    return getPlaceholderImage()
  }
}

// Asset request handler (Stale While Revalidate)
async function handleAssetRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    
    // Always fetch from network in background
    const fetchPromise = fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(ASSETS_CACHE)
          cache.put(request, networkResponse.clone())
        }
        return networkResponse
      })
      .catch(() => cachedResponse)

    // Return cached response immediately if available
    return cachedResponse || fetchPromise
  } catch (error) {
    console.log('Asset request failed:', error)
    return fetch(request)
  }
}

// API request handler (Network First)
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE)
      cache.put(request, networkResponse.clone())
      return networkResponse
    }

    // If network fails, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // If both fail, return offline response
    return getOfflineApiResponse()
  } catch (error) {
    console.log('API request failed:', error)
    
    // Try cache as fallback
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    return getOfflineApiResponse()
  }
}

// General fetch request handler (Stale While Revalidate)
async function handleFetchRequest(request) {
  try {
    const cachedResponse = await caches.match(request)
    
    const fetchPromise = fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          const cache = await caches.open(CACHE_NAME)
          cache.put(request, networkResponse.clone())
        }
        return networkResponse
      })
      .catch(() => cachedResponse)

    return cachedResponse || fetchPromise
  } catch (error) {
    console.log('Fetch request failed:', error)
    return fetch(request)
  }
}

// Helper functions
async function getOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nelson-GPT - Offline</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #212121;
                color: white;
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                text-align: center;
            }
            .icon {
                width: 80px;
                height: 80px;
                margin-bottom: 20px;
                opacity: 0.7;
            }
            h1 {
                margin-bottom: 10px;
                font-size: 2rem;
            }
            p {
                margin-bottom: 20px;
                opacity: 0.8;
            }
            button {
                background-color: #2f2f2f;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 1rem;
                transition: background-color 0.2s;
            }
            button:hover {
                background-color: #3f3f3f;
            }
        </style>
    </head>
    <body>
        <div>
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <h1>You're Offline</h1>
            <p>Nelson-GPT is currently offline. Please check your internet connection.</p>
            <button onclick="window.location.reload()">Try Again</button>
        </div>
    </body>
    </html>
  `
  
  return new Response(offlineHTML, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache'
    }
  })
}

async function getPlaceholderImage() {
  const placeholderSVG = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" fill="#2f2f2f"/>
        <text x="50" y="50" text-anchor="middle" fill="#8e8e8e" font-family="Arial" font-size="12">No Image</text>
    </svg>
  `
  
  return new Response(placeholderSVG, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  })
}

async function getOfflineApiResponse() {
  const offlineResponse = {
    error: 'You are currently offline',
    message: 'Please check your internet connection and try again.',
    timestamp: new Date().toISOString()
  }
  
  return new Response(JSON.stringify(offlineResponse), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
}

// Message handling for communication with the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CLAIM_CLIENTS') {
    self.clients.claim()
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName)
        })
      )
    })
  }
})

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(backgroundSync())
  }
})

async function backgroundSync() {
  // Handle any pending operations that need to be synced when online
  console.log('Background sync triggered')
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/icon-192.jpg',
      badge: '/icon-192.jpg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})