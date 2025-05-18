import type { Metadata } from "next"
import RegistrationForm from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn } from "lucide-react"

export const metadata: Metadata = {
  title: "User Registration - doktR G",
  description: "Register with your details to access the doktR G platform",
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-teal-500 p-3">
            <svg
              className="h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
              <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
              <circle cx="20" cy="10" r="2"></circle>
            </svg>
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to doktR G</h1>
          <p className="text-muted-foreground mt-2">Your personal healthcare companion</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold">Create Your Account</h2>
            <p className="text-sm text-muted-foreground">Enter your details to get started</p>
          </div>
          <RegistrationForm />

          {/* Login option */}
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground mb-3">Already have an account?</p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login with Your Unique ID
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
