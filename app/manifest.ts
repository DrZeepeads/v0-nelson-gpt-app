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
  }
}
