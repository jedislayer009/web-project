"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Phone, Trash2, Plus, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Add this import at the top
import { getUserStorageKey } from "@/lib/utils"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  relation: z.string().min(2, {
    message: "Relation must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits.",
    }),
})

interface EmergencyContact {
  id: string
  name: string
  relation: string
  phone: string
}

export default function EmergencyContacts() {
  const router = useRouter()
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      relation: "",
      phone: "",
    },
  })

  // Update the useEffect to load user-specific data
  useEffect(() => {
    // Load contacts from localStorage using user-specific key
    const storageKey = getUserStorageKey("emergency_contacts")
    const storedContacts = localStorage.getItem(storageKey)
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    }
  }, [])

  // Update the onSubmit function to save to user-specific storage
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Create new contact
    const newContact: EmergencyContact = {
      id: `contact-${Date.now()}`,
      name: values.name,
      relation: values.relation,
      phone: values.phone,
    }

    // Add to contacts list
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)

    // Save to localStorage with user-specific key
    const storageKey = getUserStorageKey("emergency_contacts")
    localStorage.setItem(storageKey, JSON.stringify(updatedContacts))

    // Reset form
    form.reset()
    setIsAdding(false)
    setIsSubmitted(true)

    // Hide success message after a delay
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  // Update the deleteContact function to use user-specific storage
  const deleteContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id)
    setContacts(updatedContacts)
    const storageKey = getUserStorageKey("emergency_contacts")
    localStorage.setItem(storageKey, JSON.stringify(updatedContacts))
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="sm" asChild className="p-0 h-8 w-8">
            <Link href="/emergency">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Emergency Contacts</h1>
        </div>
        <p className="text-muted-foreground">Manage your emergency contacts for quick access during emergencies</p>
      </div>

      {isSubmitted && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <p>Contact added successfully</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Emergency Contacts</CardTitle>
              <CardDescription>People to contact in case of emergency</CardDescription>
            </div>
            <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No emergency contacts yet</h3>
              <p className="text-muted-foreground mb-4">Add emergency contacts for quick access during emergencies</p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Emergency Contact
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      {contact.phone}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteContact(contact.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isAdding && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Add Emergency Contact</CardTitle>
                <CardDescription>Enter details of your emergency contact</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      name="relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <FormControl>
                            <Input placeholder="Spouse, Parent, Doctor, etc." {...field} />
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
                          <FormDescription>Enter phone number without spaces or special characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Contact</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>These contacts will be available during emergency situations</span>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/emergency">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Emergency
          </Link>
        </Button>
      </div>
    </div>
  )
}
