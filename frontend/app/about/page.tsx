import Header from "@/components/Header"

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Netflix</h1>
        <p className="mb-4">
          Netflix is the world's leading streaming entertainment service with over 200 million paid memberships in over
          190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and
          languages.
        </p>
        <p className="mb-4">
          Members can watch as much as they want, anytime, anywhere, on any internet-connected screen. Members can play,
          pause and resume watching, all without commercials or commitments.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live, we give you
          access to best-in-class TV shows, movies and documentaries. Our members control what they want to watch, when
          they want it, with no ads, in one simple subscription.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our History</h2>
        <p className="mb-4">
          Netflix was founded in 1997 by Reed Hastings and Marc Randolph in Scotts Valley, California. The company's
          primary business is its subscription-based streaming service which offers online streaming of a library of
          films and television programs, including those produced in-house.
        </p>
      </div>
    </main>
  )
}

