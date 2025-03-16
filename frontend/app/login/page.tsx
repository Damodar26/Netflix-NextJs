"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the user credentials
    router.push("/profiles")
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/MacBook Pro 16_ - 2.png')",
        backgroundSize: "100% 100%"  // or use "cover" if you want to maintain aspect ratio
      }}
    >
      <div className="min-h-screen  flex flex-col items-center justify-center">
        <div className="bg-black bg-opacity-70 p-16 rounded-md w-full max-w-md">
          <h1 className="text-4xl font-bold mb-8 text-white">Sign In</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 border-none"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 border-none"
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Sign In
            </Button>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-gray-400 text-sm">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-gray-400 text-sm hover:underline">
                Need help?
              </a>
            </div>
          </form>
          <p className="mt-4 text-gray-400">
            New to Netflix?{" "}
            <a href="/signup" className="text-white hover:underline">
              Sign up now
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

