"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const profiles = [
  { id: 1, name: "John", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Jane", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Kids", avatar: "/placeholder.svg?height=100&width=100" },
]

export default function Profiles() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => router.push("/home")}
            className="group text-center focus:outline-none"
          >
            <div className="relative w-[200px] h-[200px] mb-4">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                layout="fill"
                className="rounded-md group-hover:border-2 group-hover:border-white"
              />
            </div>
            <p className="text-gray-400 group-hover:text-white">{profile.name}</p>
          </button>
        ))}
        <button onClick={() => router.push("/add-profile")} className="group text-center focus:outline-none">
          <div className="w-[200px] h-[200px] rounded-md bg-gray-600 flex items-center justify-center group-hover:bg-gray-500 group-hover:border-2 group-hover:border-white mb-4">
            <Plus size={64} className="text-gray-400 group-hover:text-white" />
          </div>
          <p className="text-gray-400 group-hover:text-white">Add Profile</p>
        </button>
      </div>
      <Button
        onClick={() => router.push("/manage-profiles")}
        variant="outline"
        className="mt-8 text-gray-400 hover:text-white"
      >
        Manage Profiles
      </Button>
    </div>
  )
}

