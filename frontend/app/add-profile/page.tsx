"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddProfile() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("New profile:", { name, age, gender })
    // For now, we'll just redirect back to the profiles page
    router.push("/profiles")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-8">Add New Profile</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 border-none"
        />
        <Input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 border-none"
        />
        <Select onValueChange={setGender}>
          <SelectTrigger className="bg-gray-700 text-white border-none">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
          Create Profile
        </Button>
      </form>
    </div>
  )
}

