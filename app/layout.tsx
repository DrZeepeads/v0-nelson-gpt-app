import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ServiceWorkerProvider } from "@/components/service-worker-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nelson-GPT - Smart Pediatric Assistant",
  description: "Smart Pediatric Assistant powered by AI",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nelson-GPT",
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Nelson-GPT',
    'application-name': 'Nelson-GPT',
    'msapplication-TileColor': '#212121',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#212121',
    'color-scheme': 'dark',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['pediatrics', 'medical', 'AI', 'healthcare', 'children', 'assistant'],
  authors: [{ name: 'Dr. Zee' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Nelson-GPT',
    title: 'Nelson-GPT - Smart Pediatric Assistant',
    description: 'Smart Pediatric Assistant powered by AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nelson-GPT - Smart Pediatric Assistant',
    description: 'Smart Pediatric Assistant powered by AI',
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#212121",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#212121" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Nelson-GPT" />
        <meta name="application-name" content="Nelson-GPT" />
        
        {/* PWA Meta Tags */}
        <meta name="msapplication-TileColor" content="#212121" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                      console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ServiceWorkerProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ServiceWorkerProvider>
        <Analytics />
      </body>
    </html>
  )
}
