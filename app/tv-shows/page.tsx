"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Row from "@/components/Row"
import { allContent } from "@/data/content"

export default function TVShows() {
  const [popularShows, setPopularShows] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [trendingNow, setTrendingNow] = useState([])
  const [acclaimedShows, setAcclaimedShows] = useState([])
  const [dramaShows, setDramaShows] = useState([])
  const [sciFiShows, setSciFiShows] = useState([])

  // Shuffle function to randomize arrays
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  useEffect(() => {
    // Filter shows from allContent
    const tvShows = allContent.filter((item) => item.type === "show")

    // Get random slices of shows for different sections
    setPopularShows(shuffleArray(tvShows).slice(0, 6))
    setNewReleases(shuffleArray(tvShows.filter((show) => Number.parseInt(show.year || "0") >= 2022)).slice(0, 6))
    setTrendingNow(shuffleArray(tvShows).slice(0, 6))
    setAcclaimedShows(shuffleArray(tvShows.filter((show) => show.status === "acclaimed")).slice(0, 6))
    setDramaShows(shuffleArray(tvShows.filter((show) => show.genre === "drama")).slice(0, 6))
    setSciFiShows(shuffleArray(tvShows.filter((show) => show.genre === "sci-fi")).slice(0, 6))
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">TV Shows</h1>
        <Row title="Popular on Netflix" shows={popularShows} />
        <Row title="New Releases" shows={newReleases} />
        <Row title="Trending Now" shows={trendingNow} />
        <Row title="Critically Acclaimed" shows={acclaimedShows} />
        <Row title="Drama Shows" shows={dramaShows} />
        <Row title="Sci-Fi Shows" shows={sciFiShows} />
      </div>
    </main>
  )
}

