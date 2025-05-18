"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { getUserStorageKey } from "@/lib/utils"

const formSchema = z.object({
  doctorName: z.string().min(2, {
    message: "Doctor name must be at least 2 characters.",
  }),
  specialty: z.string().min(1, {
    message: "Specialty is required.",
  }),
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  time: z.string().min(1, {
    message: "Time is required.",
  }),
  location: z.string().min(1, {
    message: "Location is required.",
  }),
  reason: z.string().min(1, {
    message: "Reason for visit is required.",
  }),
  notes: z.string().optional(),
  appointmentType: z.string({
    required_error: "Please select an appointment type.",
  }),
})

export default function AddAppointment() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctorName: "",
      specialty: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      reason: "",
      notes: "",
      appointmentType: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would save this to a database
    console.log(values)

    // Get existing appointments from localStorage or initialize empty array
    const storageKey = getUserStorageKey("appointments")
    const existingAppointments = JSON.parse(localStorage.getItem(storageKey) || "[]")

    // Add new appointment
    const newAppointment = {
      ...values,
      id: `appt-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    // Save updated appointments
    localStorage.setItem(storageKey, JSON.stringify([...existingAppointments, newAppointment]))

    // Show success state
    setIsSubmitted(true)

    // Redirect after a delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Appointment Scheduled Successfully
            </CardTitle>
            <CardDescription>Your appointment has been saved</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Schedule Appointment</h1>
        <p className="text-muted-foreground">Enter details for your medical appointment</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Enter information about your appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="doctorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialty</FormLabel>
                      <FormControl>
                        <Input placeholder="Cardiology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select appointment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="check-up">Regular Check-up</SelectItem>
                        <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="specialist">Specialist Visit</SelectItem>
                        <SelectItem value="procedure">Medical Procedure</SelectItem>
                        <SelectItem value="lab-work">Lab Work</SelectItem>
                        <SelectItem value="imaging">Imaging/Radiology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City Medical Center, 123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Visit</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of why you're seeing the doctor"
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
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about this appointment"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Schedule Appointment</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
