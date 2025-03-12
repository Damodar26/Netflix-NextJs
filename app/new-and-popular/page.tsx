"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Row from "@/components/Row"
import { allContent } from "@/data/content"

export default function NewAndPopular() {
  const [newOnNetflix, setNewOnNetflix] = useState([])
  const [comingThisWeek, setComingThisWeek] = useState([])
  const [worthTheWait, setWorthTheWait] = useState([])
  const [popular2023, setPopular2023] = useState([])
  const [trendingAnime, setTrendingAnime] = useState([])

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
    // Get recent content (2023-2024)
    const recentContent = allContent.filter((item) => Number.parseInt(item.year || "0") >= 2023)

    // Get acclaimed content
    const acclaimedContent = allContent.filter((item) => item.status === "acclaimed")

    // Get upcoming content (2024)
    const upcomingContent = allContent.filter((item) => item.year === "2024")

    // Get 2023 content
    const content2023 = allContent.filter((item) => item.year === "2023")

    // Get anime content
    const animeContent = allContent.filter((item) => item.type === "anime")

    // Get random slices for different sections
    setNewOnNetflix(shuffleArray(recentContent).slice(0, 6))
    setComingThisWeek(shuffleArray(upcomingContent).slice(0, 6))
    setWorthTheWait(shuffleArray(acclaimedContent).slice(0, 6))
    setPopular2023(shuffleArray(content2023).slice(0, 6))
    setTrendingAnime(shuffleArray(animeContent).slice(0, 6))
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">New & Popular</h1>
        <Row title="New on Netflix" shows={newOnNetflix} />
        <Row title="Coming This Week" shows={comingThisWeek} />
        <Row title="Worth the Wait" shows={worthTheWait} />
        <Row title="Popular in 2023" shows={popular2023} />
        <Row title="Trending Anime" shows={trendingAnime} />
      </div>
    </main>
  )
}

