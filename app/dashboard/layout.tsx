import React from "react"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "MoInterview - Practice Interviews With Real Professionals",
  description:
    "Book mock interviews with real professionals from top companies. Get human and AI feedback to ace your interviews.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0a08" },
  ],
}

// Nested layout: the root layout (app/layout.tsx) already provides <html>, <body>,
// ThemeProvider, and Analytics. A nested layout must render only its own content.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-16">{children}</main>
    </div>
  )
}
