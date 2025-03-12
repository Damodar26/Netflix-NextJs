import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('/bgnet.png')",
      }}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <Link href="/" className="text-red-600 text-5xl font-bold">
          NETFLIX
        </Link>
        <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-6">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>

      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
        <p className="text-2xl md:text-3xl mb-6">Watch anywhere. Cancel anytime.</p>
        <p className="text-xl md:text-2xl mb-8">
          Ready to binge? Enter your email to create or restart your membership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Input
            type="email"
            placeholder="Email address"
            className="h-14 min-w-[300px] bg-black/60 border border-gray-600 text-white placeholder:text-gray-400"
          />
          <Button asChild size="lg" className="h-14 px-8 bg-red-600 hover:bg-red-700 text-white text-xl">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

