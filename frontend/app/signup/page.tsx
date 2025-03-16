"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically create a new user account
    // For this example, we'll just redirect to the profiles page
    router.push("/profiles")
  }

  return (
    <div
      className="min-h-screen bg-black-700 bg-cover bg-center bg-no-repeat"
      
    >
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Link href="/" className="text-red-600 text-5xl font-bold">
            NETFLIX
          </Link>
        </div>

        <div className="bg-black bg-opacity-80 p-16 rounded-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-white">Sign Up</h1>
          <form onSubmit={handleSignUp} className="space-y-6">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 border-none h-12"
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 border-none h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 border-none h-12"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
              disabled={!agreeTerms}
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-6 text-gray-400 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

