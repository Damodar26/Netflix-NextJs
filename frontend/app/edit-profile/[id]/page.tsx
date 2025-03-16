"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User } from "lucide-react"

const avatarOptions = [
  "/placeholder.svg?height=100&width=100&text=1",
  "/placeholder.svg?height=100&width=100&text=2",
  "/placeholder.svg?height=100&width=100&text=3",
  "/placeholder.svg?height=100&width=100&text=4",
]

export default function EditProfile() {
  const router = useRouter()
  const params = useParams()
  const profileId = params.id

  const [profile, setProfile] = useState({
    id: Number.parseInt(profileId as string),
    name: "",
    avatar: "/placeholder.svg?height=100&width=100",
    maturitySettings: "all",
    autoplayControls: true,
  })

  // Simulate fetching profile data
  useEffect(() => {
    // In a real app, you would fetch the profile data from an API
    const mockProfiles = {
      "1": {
        id: 1,
        name: "John",
        avatar: "/placeholder.svg?height=100&width=100",
        maturitySettings: "all",
        autoplayControls: true,
      },
      "2": {
        id: 2,
        name: "Jane",
        avatar: "/placeholder.svg?height=100&width=100",
        maturitySettings: "teen",
        autoplayControls: true,
      },
      "3": {
        id: 3,
        name: "Kids",
        avatar: "/placeholder.svg?height=100&width=100",
        maturitySettings: "kids",
        autoplayControls: false,
      },
    }

    if (profileId && mockProfiles[profileId]) {
      setProfile(mockProfiles[profileId])
    }
  }, [profileId])

  const handleSave = (e) => {
    e.preventDefault()
    // In a real app, you would save the profile data to an API
    console.log("Saving profile:", profile)
    router.push("/profiles")
  }

  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-8">Edit Profile</h1>

        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              {profile.avatar ? (
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-700 rounded-md flex items-center justify-center">
                  <User size={80} />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <Label htmlFor="name" className="text-lg">
                  Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-gray-700 border-none text-white mt-2"
                />
              </div>

              <div>
                <Label className="text-lg block mb-2">Avatar</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {avatarOptions.map((avatar, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${profile.avatar === avatar ? "border-red-600" : "border-transparent"}`}
                      onClick={() => setProfile({ ...profile, avatar })}
                    >
                      <Image
                        src={avatar || "/placeholder.svg"}
                        alt={`Avatar option ${index + 1}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg block mb-2">Maturity Settings</Label>
                <RadioGroup
                  value={profile.maturitySettings}
                  onValueChange={(value) => setProfile({ ...profile, maturitySettings: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Maturity Ratings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teen" id="teen" />
                    <Label htmlFor="teen">Teen and Below</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kids" id="kids" />
                    <Label htmlFor="kids">Kids Only</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={profile.autoplayControls}
                  onChange={(e) => setProfile({ ...profile, autoplayControls: e.target.checked })}
                  className="rounded border-gray-700 bg-gray-700 text-red-600"
                />
                <Label htmlFor="autoplay">Autoplay previews</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={() => router.push("/manage-profiles")}
              variant="outline"
              className="text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

