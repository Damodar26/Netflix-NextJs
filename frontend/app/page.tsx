"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!email) {
      setMessage("Please enter an email address.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include", // Important for cookies if using sessions
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Signup failed")
      }

      setMessage("Signup successful! Please check your email.")
    } catch (error) {
      console.error("Error:", error)
      setMessage(error.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('/bgnet.png')",
      }}
    >
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Link href="/" className="text-red-600 text-5xl font-bold">
          NETFLIX
        </Link>
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
        <p className="text-2xl md:text-3xl mb-6">Watch anywhere. Cancel anytime.</p>
        <p className="text-xl md:text-2xl mb-8">
          Ready to binge? Enter your email to create or restart your membership.
        </p>

        {/* Input & Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 min-w-[300px] bg-black/60 border border-gray-600 text-white placeholder:text-gray-400"
          />
          <Button
            size="lg"
            className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white text-xl"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Get Started"}
          </Button>
        </div>

        {/* Message Display */}
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </div>
  )
}
