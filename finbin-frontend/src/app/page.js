"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <ThemeToggle />
      </div>
      {/* <Logo className="mb-8" /> */}
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="mt-4 text-muted-foreground">Redirecting you to the right place...</p>
    </div>
  )
}