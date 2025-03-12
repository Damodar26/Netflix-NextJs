import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { UserProvider } from "@/contexts/user-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Netflix Clone",
  description: "A Netflix clone built with Next.js and React",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'