"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Copy, ArrowRight } from "lucide-react"
import { generateUniqueId, setCurrentUser } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  idNumber: z.string().min(1, {
    message: "ID number is required.",
  }),
})

export default function RegistrationForm() {
  const [uniqueId, setUniqueId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      idNumber: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Generate unique ID based on name and phone
    const generatedId = generateUniqueId(values.name, values.phone)
    setUniqueId(generatedId)

    // Store user data in localStorage
    const userData = {
      ...values,
      uniqueId: generatedId,
      registeredAt: new Date().toISOString(),
    }

    // Save to localStorage with user-specific key
    if (typeof window !== "undefined") {
      localStorage.setItem(`doktrg_user_${generatedId}`, JSON.stringify(userData))

      // Set as current user
      setCurrentUser(generatedId)
    }
  }

  // Copy unique ID to clipboard
  const copyToClipboard = () => {
    if (uniqueId) {
      navigator.clipboard.writeText(uniqueId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Proceed to dashboard
  const proceedToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <>
      {!uniqueId ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormDescription>Enter your phone number without spaces or special characters.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your ID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Register & Generate ID
            </Button>
          </form>
        </Form>
      ) : (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Registration Successful
            </CardTitle>
            <CardDescription>Your account has been created successfully.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Your Unique Identifier</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-md border flex-1 font-mono text-sm">
                    {uniqueId}
                  </div>
                  <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10">
                    {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-xs text-muted-foreground">
              Please save this ID for future reference. You will need it to log in to your account.
            </p>
            <Button className="w-full" onClick={proceedToDashboard}>
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
