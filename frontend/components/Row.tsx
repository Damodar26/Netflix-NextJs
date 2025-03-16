"use client"

import { useState } from "react"
import ShowCard from "./ShowCard"
import TrailerModal from "./TrailerModal"
import { useUser, type Show } from "@/contexts/user-context"

interface RowProps {
  title: string
  shows: Show[]
  onShowClick?: (show: Show) => void
}

export default function Row({ title, shows, onShowClick }: RowProps) {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const { addToWatchHistory } = useUser()

  const handleShowClick = (show: Show) => {
    setSelectedShow(show)
    addToWatchHistory(show)
    if (onShowClick) {
      onShowClick(show)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} onClick={() => handleShowClick(show)} />
        ))}
      </div>
      {selectedShow && <TrailerModal show={selectedShow} onClose={() => setSelectedShow(null)} />}
    </div>
  )
}

