import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Netflix</h1>
      <p className="text-xl mb-8">Watch unlimited TV shows and movies.</p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    </div>
  )
}

