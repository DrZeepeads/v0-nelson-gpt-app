import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nelson-GPT - Smart Pediatric Assistant",
    short_name: "Nelson-GPT",
    description: "Smart Pediatric Assistant powered by AI",
    start_url: "/",
    display: "standalone",
    background_color: "#212121",
    theme_color: "#212121",
    orientation: "portrait",
    categories: ["medical", "health", "education", "productivity"],
    lang: "en",
    scope: "/",
    dir: "ltr",
    icons: [
      {
        src: "/icon-192.jpg",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.jpg",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    screenshots: [
      {
        src: "/placeholder.jpg",
        sizes: "1280x720",
        type: "image/jpeg",
        form_factor: "wide",
        label: "Nelson-GPT Chat Interface"
      },
      {
        src: "/placeholder.jpg",
        sizes: "750x1334",
        type: "image/jpeg",
        form_factor: "narrow",
        label: "Nelson-GPT Mobile View"
      }
    ],
    shortcuts: [
      {
        name: "New Chat",
        short_name: "New Chat",
        description: "Start a new conversation",
        url: "/",
        icons: [
          {
            src: "/icon-192.jpg",
            sizes: "192x192"
          }
        ]
      }
    ],
    prefer_related_applications: false,
    related_applications: []
  }
}
