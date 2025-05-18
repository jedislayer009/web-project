"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Add this import at the top
import { getUserStorageKey } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  type: z.string({
    required_error: "Please select a record type.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  provider: z.string().min(2, {
    message: "Provider name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  notes: z.string().optional(),
})

export default function AddMedicalRecord() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      provider: "",
      notes: "",
    },
  })

  // Update the onSubmit function to use user-specific storage key
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this to a database
    console.log(values)

    // Get existing records from localStorage or initialize empty array
    const storageKey = getUserStorageKey("medical_records")
    const existingRecords = JSON.parse(localStorage.getItem(storageKey) || "[]")

    // Add new record
    const newRecord = {
      ...values,
      id: `record-${Date.now()}`,
      date: values.date.toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Save updated records
    localStorage.setItem(storageKey, JSON.stringify([...existingRecords, newRecord]))

    // Show success state
    setIsSubmitted(true)

    // Redirect after a delay
    setTimeout(() => {
      router.push("/records")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Record Added Successfully
            </CardTitle>
            <CardDescription>Your medical record has been saved</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Redirecting to your records page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Medical Record</h1>
        <p className="text-muted-foreground">Enter details about your medical record</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Title</FormLabel>
                <FormControl>
                  <Input placeholder="Annual Physical Examination" {...field} />
                </FormControl>
                <FormDescription>Enter a descriptive title for this medical record</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Record Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a record type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="check-up">Check-up</SelectItem>
                    <SelectItem value="lab-test">Lab Test</SelectItem>
                    <SelectItem value="imaging">Imaging</SelectItem>
                    <SelectItem value="specialist">Specialist Visit</SelectItem>
                    <SelectItem value="vaccination">Vaccination</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the category that best describes this record</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>When did this medical event occur?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Healthcare Provider</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Smith / City Hospital" {...field} />
                </FormControl>
                <FormDescription>Enter the name of the doctor or facility</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of the medical record"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any additional notes or observations" className="min-h-[100px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Record</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
