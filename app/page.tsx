import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Software Prototype Generator</h1>
        <p className="text-xl text-gray-600">
          Create your software prototype quickly and easily
        </p>
        <Link 
          href="/create" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90"
        >
          Get Started
        </Link>
      </div>
    </main>
  )
}
