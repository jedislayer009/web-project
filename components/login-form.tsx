"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  uniqueId: z.string().min(10, {
    message: "Unique ID must be at least 10 characters.",
  }),
})

export default function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uniqueId: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would validate the unique ID against a database
    // For this example, we'll just simulate a successful login
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Login Successful
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have successfully logged in to your account.</p>
          <Button className="w-full mt-4" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
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
            <a href="/">Don't have an ID? Register here</a>
          </Button>
        </div>
      </form>
    </Form>
  )
}
