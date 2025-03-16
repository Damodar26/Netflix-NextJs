"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShowCard from "@/components/ShowCard"
import TrailerModal from "@/components/TrailerModal"
import { Button } from "@/components/ui/button"
import { User, LogOut, Edit, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useUser } from "@/contexts/user-context"

export default function Profile() {
  const { userData, removeFromWatchHistory } = useUser()
  const [selectedShow, setSelectedShow] = useState(null)
  const router = useRouter()

  const handleLogout = () => {
    // Here you would typically clear the user session
    router.push("/")
  }

  const handleEditProfile = () => {
    router.push("/edit-profile/1")
  }

  const handleRemoveFromHistory = (show) => {
    removeFromWatchHistory(show.id)

    toast({
      title: "Removed from Watch History",
      description: `"${show.title}" has been removed from your watch history.`,
      duration: 3000,
    })
  }

  return (
    <main className="min-h-screen bg-black pt-20">
      <Header />
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-600 rounded-full p-4">
              <User size={48} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{userData.name}</h1>
              <p className="text-white-400">{userData.email}</p>
            </div>
          </div>
          <div className="space-x-4">
            <Button onClick={handleEditProfile} className="bg-red-600 hover:bg-red-700 text-white" variant="default">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
            <Button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600 text-white" variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="history">Watch History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="watchlist">
            {userData.watchlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userData.watchlist.map((show) => (
                  <ShowCard key={show.id} show={show} onClick={() => setSelectedShow(show)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Your watchlist is empty.</p>
                <Button onClick={() => router.push("/home")} className="bg-red-600 hover:bg-red-700 text-white">
                  Browse Shows
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            {userData.watchHistory.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userData.watchHistory.map((show) => (
                  <div key={show.id} className="relative group">
                    <ShowCard show={show} onClick={() => setSelectedShow(show)} />
                    <Button
                      onClick={() => handleRemoveFromHistory(show)}
                      className="absolute top-2 right-2 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Your watch history is empty.</p>
                <Button onClick={() => router.push("/home")} className="bg-red-600 hover:bg-red-700 text-white">
                  Browse Shows
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="favorites">
            {userData.favorites.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userData.favorites.map((show) => (
                  <ShowCard key={show.id} show={show} onClick={() => setSelectedShow(show)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Your favorites list is empty.</p>
                <Button onClick={() => router.push("/home")} className="bg-red-600 hover:bg-red-700 text-white">
                  Browse Shows
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {selectedShow && <TrailerModal show={selectedShow} onClose={() => setSelectedShow(null)} />}
      </div>
      <Toaster />
    </main>
  )
}

