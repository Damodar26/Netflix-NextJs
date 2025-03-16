"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart, Plus, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useUser, type Show } from "@/contexts/user-context"

interface ShowCardProps {
  show: Show
  onClick: (show: Show) => void
}

export default function ShowCard({ show, onClick }: ShowCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    isInFavorites,
    isInWatchlist,
    addToWatchHistory,
  } = useUser()

  const isFavorite = isInFavorites(show.id)
  const isInList = isInWatchlist(show.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isFavorite) {
      removeFromFavorites(show.id)
      toast({
        title: "Removed from Favorites",
        description: `"${show.title}" has been removed from your favorites.`,
        duration: 3000,
      })
    } else {
      addToFavorites(show)
      toast({
        title: "Added to Favorites",
        description: `"${show.title}" has been added to your favorites.`,
        duration: 3000,
      })
    }
  }

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isInList) {
      removeFromWatchlist(show.id)
      toast({
        title: "Removed from Watchlist",
        description: `"${show.title}" has been removed from your watchlist.`,
        duration: 3000,
      })
    } else {
      addToWatchlist(show)
      toast({
        title: "Added to Watchlist",
        description: `"${show.title}" has been added to your watchlist.`,
        duration: 3000,
      })
    }
  }

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDetails(true)
  }

  const handleShowClick = () => {
    addToWatchHistory(show)
    onClick(show)
  }

  return (
    <div className="relative flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105">
      <Image
        src={show.image || "/placeholder.svg"}
        alt={show.title}
        width={200}
        height={300}
        className="rounded-md h-72 object-cover" // Increased height
        onClick={handleShowClick}
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-sm font-semibold mb-2">{show.title}</h3>
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleFavoriteClick}
            className={isFavorite ? "text-red-500" : "text-white"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleWatchlistClick}
            className={isInList ? "text-green-500" : "text-white"}
          >
            {isInList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" onClick={handleDetailsClick}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{show.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              {show.year && <Badge variant="outline">{show.year}</Badge>}
              {show.rating && <Badge variant="outline">{show.rating}</Badge>}
              {show.genre && (
                <Badge variant="outline" className="capitalize">
                  {show.genre}
                </Badge>
              )}
            </div>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Image
                src={show.image || "/placeholder.svg"}
                alt={show.title}
                width={400}
                height={600}
                className="rounded-md w-full h-auto"
              />
            </div>
            <div>
              <DialogDescription className="text-gray-300 mb-4">
                {show.description || "No description available."}
              </DialogDescription>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleFavoriteClick}
                  className={isFavorite ? "bg-red-600 text-white" : "bg-gray-700 text-white"}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                <Button
                  onClick={handleWatchlistClick}
                  className={isInList ? "bg-green-600 text-white" : "bg-gray-700 text-white"}
                >
                  {isInList ? <Check className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {isInList ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDetails(false)} variant="outline" className="text-white">
              Close
            </Button>
            <Button onClick={handleShowClick} className="bg-red-600 hover:bg-red-700 text-white">
              Play
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

