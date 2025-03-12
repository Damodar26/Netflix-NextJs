"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/home" className="text-red-600 text-4xl font-bold">
          NETFLIX
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/home" className="text-sm">
            Home
          </Link>
          <Link href="/tv-shows" className="text-sm">
            TV Shows
          </Link>
          <Link href="/movies" className="text-sm">
            Movies
          </Link>
          <Link href="/new-and-popular" className="text-sm">
            New & Popular
          </Link>
          <Link href="/profile" className="text-sm">
            Profile
          </Link>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mr-2 text-red-700 placeholder-gray-400"
          />
          <button type="submit">
            <Search className="h-5 w-5" />
          </button>
        </form>
      </nav>
    </header>
  )
}

