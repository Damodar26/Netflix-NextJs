"use client"

import { useState, useEffect } from "react"
import { Play, Info, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Featured({ shows }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [videoIds, setVideoIds] = useState([])

  useEffect(() => {
    // Extract video IDs from all show trailers
    const ids = shows.map((show) => {
      try {
        const url = new URL(show.trailerUrl)
        return url.searchParams.get("v") || url.pathname.split("/").pop()
      } catch (error) {
        return null
      }
    })
    setVideoIds(ids)
  }, [shows])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [shows])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shows.length) % shows.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const currentShow = shows[currentIndex]
  const currentVideoId = videoIds[currentIndex]

  return (
    <div className="relative h-[56.25vw]">
      {currentVideoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${currentVideoId}&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      ) : (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <p className="text-white">Unable to load trailer</p>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-8">
        <h1 className="text-5xl font-bold mb-4">{currentShow.title}</h1>
        <p className="text-gray-300 mb-4 max-w-2xl">{currentShow.description}</p>
        <div className="flex space-x-4">
          <Button className="bg-white text-black hover:bg-gray-200">
            <Play className="mr-2 h-4 w-4" /> Play
          </Button>
          <Button variant="secondary" className="bg-gray-600 text-white hover:bg-gray-700">
            <Info className="mr-2 h-4 w-4" /> More Info
          </Button>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2">
        <Button onClick={toggleMute} variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70">
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}

