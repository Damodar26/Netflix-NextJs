"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our content
export type Show = {
  id: number
  title: string
  image: string
  trailerUrl: string
  description?: string
  genre?: string
  year?: string
  rating?: string
}

// Define user data structure
type UserData = {
  name: string
  email: string
  watchlist: Show[]
  watchHistory: Show[]
  favorites: Show[]
  likedGenres: Record<string, number> // Track genre preferences
}

// Initial user data
const initialUserData: UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  watchlist: [],
  watchHistory: [],
  favorites: [],
  likedGenres: {},
}

// Context type
type UserContextType = {
  userData: UserData
  addToWatchlist: (show: Show) => void
  removeFromWatchlist: (showId: number) => void
  addToWatchHistory: (show: Show) => void
  removeFromWatchHistory: (showId: number) => void
  addToFavorites: (show: Show) => void
  removeFromFavorites: (showId: number) => void
  isInWatchlist: (showId: number) => boolean
  isInFavorites: (showId: number) => boolean
  getMostLikedShow: () => Show | null
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(initialUserData)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("netflix_user_data")
    if (savedData) {
      try {
        setUserData(JSON.parse(savedData))
      } catch (error) {
        console.error("Failed to parse user data:", error)
      }
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("netflix_user_data", JSON.stringify(userData))
  }, [userData])

  // Add to watchlist
  const addToWatchlist = (show: Show) => {
    setUserData((prev) => {
      if (prev.watchlist.some((s) => s.id === show.id)) {
        return prev // Already in watchlist
      }
      return {
        ...prev,
        watchlist: [...prev.watchlist, show],
      }
    })
  }

  // Remove from watchlist
  const removeFromWatchlist = (showId: number) => {
    setUserData((prev) => ({
      ...prev,
      watchlist: prev.watchlist.filter((show) => show.id !== showId),
    }))
  }

  // Add to watch history
  const addToWatchHistory = (show: Show) => {
    setUserData((prev) => {
      // Update genre preferences
      const updatedLikedGenres = { ...prev.likedGenres }
      if (show.genre) {
        updatedLikedGenres[show.genre] = (updatedLikedGenres[show.genre] || 0) + 1
      }

      // Remove if already in history (to move it to the top)
      const filteredHistory = prev.watchHistory.filter((s) => s.id !== show.id)

      return {
        ...prev,
        watchHistory: [show, ...filteredHistory],
        likedGenres: updatedLikedGenres,
      }
    })
  }

  // Remove from watch history
  const removeFromWatchHistory = (showId: number) => {
    setUserData((prev) => ({
      ...prev,
      watchHistory: prev.watchHistory.filter((show) => show.id !== showId),
    }))
  }

  // Add to favorites
  const addToFavorites = (show: Show) => {
    setUserData((prev) => {
      // Update genre preferences more strongly for favorites
      const updatedLikedGenres = { ...prev.likedGenres }
      if (show.genre) {
        updatedLikedGenres[show.genre] = (updatedLikedGenres[show.genre] || 0) + 3
      }

      if (prev.favorites.some((s) => s.id === show.id)) {
        return prev // Already in favorites
      }

      return {
        ...prev,
        favorites: [...prev.favorites, show],
        likedGenres: updatedLikedGenres,
      }
    })
  }

  // Remove from favorites
  const removeFromFavorites = (showId: number) => {
    setUserData((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((show) => show.id !== showId),
    }))
  }

  // Check if in watchlist
  const isInWatchlist = (showId: number) => {
    return userData.watchlist.some((show) => show.id === showId)
  }

  // Check if in favorites
  const isInFavorites = (showId: number) => {
    return userData.favorites.some((show) => show.id === showId)
  }

  // Get most liked show (for recommendations)
  const getMostLikedShow = (): Show | null => {
    if (userData.favorites.length > 0) {
      // Return a random favorite
      return userData.favorites[Math.floor(Math.random() * userData.favorites.length)]
    }

    if (userData.watchHistory.length > 0) {
      // Return a random watched show
      return userData.watchHistory[Math.floor(Math.random() * userData.watchHistory.length)]
    }

    return null
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        addToWatchlist,
        removeFromWatchlist,
        addToWatchHistory,
        removeFromWatchHistory,
        addToFavorites,
        removeFromFavorites,
        isInWatchlist,
        isInFavorites,
        getMostLikedShow,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Hook to use the context
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

