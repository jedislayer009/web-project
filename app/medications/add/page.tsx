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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { getUserStorageKey } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medication name must be at least 2 characters.",
  }),
  dosage: z.string().min(1, {
    message: "Dosage is required.",
  }),
  frequency: z.string({
    required_error: "Please select a frequency.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().optional(),
  instructions: z.string().optional(),
  notes: z.string().optional(),
  reminders: z.boolean().default(false),
  quantity: z.string().min(1, {
    message: "Quantity is required.",
  }),
  refills: z.string().optional(),
  prescribedBy: z.string().optional(),
})

export default function AddMedication() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      instructions: "",
      notes: "",
      reminders: true,
      quantity: "",
      refills: "",
      prescribedBy: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this to a database
    console.log(values)

    // Get existing medications from localStorage or initialize empty array
    const storageKey = getUserStorageKey("medications")
    const existingMedications = JSON.parse(localStorage.getItem(storageKey) || "[]")

    // Add new medication
    const newMedication = {
      ...values,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    // Save updated medications
    localStorage.setItem(storageKey, JSON.stringify([...existingMedications, newMedication]))

    // Show success state
    setIsSubmitted(true)

    // Redirect after a delay
    setTimeout(() => {
      router.push("/medications")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Medication Added Successfully
            </CardTitle>
            <CardDescription>Your medication has been saved</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Redirecting to your medications page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Medication</h1>
        <p className="text-muted-foreground">Enter details about your medication</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your medication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lisinopril" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="10mg" {...field} />
                      </FormControl>
                      <FormDescription>Amount per dose (e.g., 10mg, 5ml)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="once-daily">Once Daily</SelectItem>
                          <SelectItem value="twice-daily">Twice Daily</SelectItem>
                          <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                          <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                          <SelectItem value="every-other-day">Every Other Day</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="as-needed">As Needed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Leave blank if ongoing</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Enter additional information about your medication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Take with food, etc." className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="30 pills" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="refills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Refills (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="prescribedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prescribed By (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. Smith" {...field} />
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
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about this medication"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable Reminders</FormLabel>
                      <FormDescription>Receive notifications when it's time to take this medication</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Save Medication</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
