"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Row from "@/components/Row"
import { allContent } from "@/data/content"

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [trendingNow, setTrendingNow] = useState([])
  const [acclaimedMovies, setAcclaimedMovies] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])

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
    // Filter movies from allContent
    const movies = allContent.filter((item) => item.type === "movie")

    // Get random slices of movies for different sections
    setPopularMovies(shuffleArray(movies).slice(0, 6))
    setNewReleases(shuffleArray(movies.filter((movie) => Number.parseInt(movie.year || "0") >= 2022)).slice(0, 6))
    setTrendingNow(shuffleArray(movies).slice(0, 6))
    setAcclaimedMovies(shuffleArray(movies.filter((movie) => movie.status === "acclaimed")).slice(0, 6))
    setActionMovies(shuffleArray(movies.filter((movie) => movie.genre === "action")).slice(0, 6))
    setComedyMovies(shuffleArray(movies.filter((movie) => movie.genre === "comedy")).slice(0, 6))
  }, [])

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>
        <Row title="Popular Movies" shows={popularMovies} />
        <Row title="New Releases" shows={newReleases} />
        <Row title="Trending Now" shows={trendingNow} />
        <Row title="Critically Acclaimed" shows={acclaimedMovies} />
        <Row title="Action Movies" shows={actionMovies} />
        <Row title="Comedy Movies" shows={comedyMovies} />
      </div>
    </main>
  )
}

