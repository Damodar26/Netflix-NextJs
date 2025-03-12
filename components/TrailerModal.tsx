"use client"

import { useState, useEffect } from "react"
import { X, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrailerModal({ show, onClose }) {
  const [isMuted, setIsMuted] = useState(true)
  const [videoId, setVideoId] = useState("")

  useEffect(() => {
    // Extract video ID from YouTube URL
    try {
      const url = new URL(show.trailerUrl)
      if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
        const id = url.searchParams.get("v") || url.pathname.split("/").pop()
        setVideoId(id)
      }
    } catch (error) {
      console.error("Invalid URL:", show.trailerUrl)
    }
  }, [show.trailerUrl])

  const toggleMute = (e) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl">
        <div className="absolute -top-12 right-0 flex items-center space-x-4">
          <Button onClick={toggleMute} className="bg-black/50 text-white hover:bg-black/70" size="icon" variant="ghost">
            {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
          </Button>
          <Button onClick={onClose} className="bg-black/50 text-white hover:bg-black/70" size="icon" variant="ghost">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
              title={`${show.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              <p className="text-white">Unable to load trailer</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-white">
          <h2 className="text-2xl font-bold">{show.title}</h2>
          {show.description && <p className="mt-2 text-gray-300">{show.description}</p>}
        </div>
      </div>
    </div>
  )
}

