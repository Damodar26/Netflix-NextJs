"use client"

import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import ShowCard from "@/components/ShowCard"
import { allContent } from "@/data/content"
import { useState, useEffect } from "react"
import type { Show } from "@/contexts/user-context"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<Show[]>([])
  const [relatedContent, setRelatedContent] = useState<Show[]>([])

  // Shuffle function to randomize arrays
  const shuffleArray = (array: Show[]) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  useEffect(() => {
    // Filter content based on search query
    const filteredResults = allContent.filter(
      (show) =>
        show.title.toLowerCase().includes(query.toLowerCase()) ||
        (show.description && show.description.toLowerCase().includes(query.toLowerCase())) ||
        (show.genre && show.genre.toLowerCase().includes(query.toLowerCase())),
    )

    setResults(filteredResults)

    // If we have results with a genre, find related content
    if (filteredResults.length > 0 && filteredResults[0].genre) {
      const genre = filteredResults[0].genre
      const related = allContent.filter((show) => !filteredResults.includes(show) && show.genre === genre)
      setRelatedContent(shuffleArray(related).slice(0, 6))
    } else {
      setRelatedContent([])
    }
  }, [query])

  const handleShowClick = (show: Show) => {
    console.log("Show clicked:", show.title)
  }

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Search Results for "{query}"</h1>
        {results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((show) => (
                <ShowCard key={show.id} show={show} onClick={() => handleShowClick(show)} />
              ))}
            </div>

            {relatedContent.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">You might also like</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {relatedContent.map((show) => (
                    <ShowCard key={show.id} show={show} onClick={() => handleShowClick(show)} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No results found for "{query}"</p>
            <p className="text-gray-500 mt-2">Try searching for a different term</p>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {shuffleArray(allContent)
                  .slice(0, 6)
                  .map((show) => (
                    <ShowCard key={show.id} show={show} onClick={() => handleShowClick(show)} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

