"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const initialProfiles = [
  { id: 1, name: "John", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Jane", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Kids", avatar: "/placeholder.svg?height=100&width=100" },
]

export default function ManageProfiles() {
  const [profiles, setProfiles] = useState(initialProfiles)
  const [profileToDelete, setProfileToDelete] = useState(null)
  const router = useRouter()

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id))
    setProfileToDelete(null)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Manage Profiles</h1>
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {profiles.map((profile) => (
          <div key={profile.id} className="text-center relative group">
            <div className="relative w-[200px] h-[200px] mb-4 bg-gray-800 rounded-md overflow-hidden">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                layout="fill"
                className="opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                <Button
                  onClick={() => router.push(`/edit-profile/${profile.id}`)}
                  variant="outline"
                  className="bg-black/50 border-white text-white"
                >
                  <Pencil className="h-5 w-5 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => setProfileToDelete(profile)}
                  variant="destructive"
                  className="bg-red-600 text-white"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
            <p className="text-gray-400">{profile.name}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/profiles")} variant="outline" className="text-white">
          Done
        </Button>
        <Button onClick={() => router.push("/add-profile")} className="bg-red-600 hover:bg-red-700 text-white">
          Add Profile
        </Button>
      </div>

      <AlertDialog open={!!profileToDelete} onOpenChange={() => setProfileToDelete(null)}>
        <AlertDialogContent className="bg-gray-900 text-white border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Profile</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete the profile "{profileToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteProfile(profileToDelete?.id)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

