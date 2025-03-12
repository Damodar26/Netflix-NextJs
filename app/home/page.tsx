"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Featured from "@/components/Featured"
import Row from "@/components/Row"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/contexts/user-context"
import { allContent } from "@/data/content"

export default function Home() {
  const { userData, addToWatchHistory, getMostLikedShow } = useUser()
  const [selectedShow, setSelectedShow] = useState(null)
  const [recommendedShow, setRecommendedShow] = useState(null)
  const [recommendedContent, setRecommendedContent] = useState([])
  const [trendingContent, setTrendingContent] = useState([])
  const [popularContent, setPopularContent] = useState([])
  const [topContent, setTopContent] = useState([])

  // Shuffle function to randomize arrays
  const shuffleArray = (array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Update recommended content based on user preferences
  useEffect(() => {
    const likedShow = getMostLikedShow()
    if (likedShow) {
      setRecommendedShow(likedShow)

      // Find similar content based on genre
      if (likedShow.genre) {
        const similar = allContent
          .filter((show) => show.id !== likedShow.id && show.genre === likedShow.genre)
          .slice(0, 6)

        setRecommendedContent(similar)
      }
    }

    // Set random trending content each time component mounts
    setTrendingContent(shuffleArray(allContent).slice(0, 6))
    setPopularContent(shuffleArray(allContent).slice(0, 6))
    setTopContent(shuffleArray(allContent).slice(0, 10))
  }, [userData.favorites, userData.watchHistory, getMostLikedShow])

  const handleShowClick = (show) => {
    addToWatchHistory(show)
    setSelectedShow(show)
  }

  // Get different content types - shuffle each category
  const movies = shuffleArray(allContent.filter((item) => item.type === "movie")).slice(0, 6)
  const shows = shuffleArray(allContent.filter((item) => item.type === "show")).slice(0, 6)
  const anime = shuffleArray(allContent.filter((item) => item.type === "anime")).slice(0, 6)
  const acclaimed = shuffleArray(allContent.filter((item) => item.status === "acclaimed")).slice(0, 6)
  const upcoming = shuffleArray(allContent.filter((item) => item.year === "2024")).slice(0, 6)

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Featured shows={shuffleArray(allContent.slice(0, 20)).slice(0, 5)} />
      <div className="container mx-auto">
        {userData.watchHistory.length > 0 && (
          <Row title="Continue Watching" shows={userData.watchHistory.slice(0, 6)} onShowClick={handleShowClick} />
        )}

        <Row title="Trending Now" shows={trendingContent} onShowClick={handleShowClick} />

        {recommendedShow && recommendedContent.length > 0 && (
          <Row
            title={`Because You Liked "${recommendedShow.title}"`}
            shows={recommendedContent}
            onShowClick={handleShowClick}
          />
        )}

        <Row title="Popular Movies" shows={movies} onShowClick={handleShowClick} />

        <Row title="Popular TV Shows" shows={shows} onShowClick={handleShowClick} />

        <Row title="Anime Highlights" shows={anime} onShowClick={handleShowClick} />

        <Row title="Coming Soon" shows={upcoming} onShowClick={handleShowClick} />

        <Row title="Award Winners" shows={acclaimed} onShowClick={handleShowClick} />

        <Row title="Popular This Week" shows={popularContent} onShowClick={handleShowClick} />

        <Row title="Top 10 in Your Region" shows={topContent} onShowClick={handleShowClick} />

        <Tabs defaultValue="action" className="w-full mt-8">
          <h2 className="text-2xl font-semibold mb-4">Browse by Genre</h2>
          <TabsList className="flex flex-wrap">
            {["action", "comedy", "drama", "sci-fi", "thriller", "horror", "romance", "documentary", "anime"].map(
              (genre) => (
                <TabsTrigger key={genre} value={genre} className="capitalize">
                  {genre}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          {["action", "comedy", "drama", "sci-fi", "thriller", "horror", "romance", "documentary", "anime"].map(
            (genre) => (
              <TabsContent key={genre} value={genre}>
                <Row
                  title={`${genre.charAt(0).toUpperCase() + genre.slice(1)}`}
                  shows={shuffleArray(allContent.filter((item) => item.genre === genre)).slice(0, 6)}
                  onShowClick={handleShowClick}
                />
              </TabsContent>
            ),
          )}
        </Tabs>
      </div>
    </main>
  )
}

