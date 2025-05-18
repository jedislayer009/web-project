"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { setCurrentUser } from "@/lib/utils"

// Form validation schema
const formSchema = z.object({
  uniqueId: z.string().min(10, {
    message: "Unique ID must be at least 10 characters.",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uniqueId: "",
    },
  })

  // Replace the entire onSubmit function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Search for a user with the given uniqueId in localStorage
    let foundUser = null

    // Iterate through all localStorage keys to find user data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("doktrg_user_")) {
        const userData = JSON.parse(localStorage.getItem(key) || "{}")
        if (userData.uniqueId === values.uniqueId) {
          foundUser = userData
          break
        }
      }
    }

    if (foundUser) {
      // Set current user
      setCurrentUser(foundUser.uniqueId)
      router.push("/dashboard")
    } else {
      // If we get here, the ID didn't match
      setError("Invalid ID. Please check and try again.")
    }
  }

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
          <p className="text-muted-foreground mt-2">Log in to access your healthcare dashboard</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="uniqueId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your unique ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm" asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Registration
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
