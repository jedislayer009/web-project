"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, User, Heart, Pill, Settings, Plus } from "lucide-react"
import Link from "next/link"
import { getUserStorageKey } from "@/lib/utils"
import EmergencyRinger from "@/components/emergency-ringer"
import { useTranslation } from "@/components/translation-provider"

interface EmergencyContact {
  id: string
  name: string
  relation: string
  phone: string
}

export default function Emergency() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    // Load contacts from localStorage using user-specific key
    const storageKey = getUserStorageKey("emergency_contacts")
    const storedContacts = localStorage.getItem(storageKey)
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h1 className="text-3xl font-bold">{t("emergency_contacts")}</h1>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/emergency/contacts">
            <Settings className="mr-2 h-4 w-4" />
            {t("manage_contacts")}
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">{t("emergency_contacts")}</TabsTrigger>
          <TabsTrigger value="info">{t("medical_info")}</TabsTrigger>
          <TabsTrigger value="nearby">{t("nearby_facilities")}</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{t("emergency_contacts")}</CardTitle>
                  <CardDescription>{t("people_to_contact_emergency")}</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/emergency/contacts">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("manage")}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <div className="text-center py-6">
                  <p className="mb-4">{t("no_emergency_contacts")}</p>
                  <Button asChild>
                    <Link href="/emergency/contacts">
                      <Plus className="mr-2 h-4 w-4" />
                      {t("add_emergency_contact")}
                    </Link>
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
                          <p className="text-sm font-medium">{contact.phone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/emergency/contacts">
                  <Plus className="mr-2 h-4 w-4" />
                  {contacts.length === 0 ? t("add_emergency_contact") : t("manage_contacts")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="info" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Medical Information</CardTitle>
              <CardDescription>Information to share with emergency responders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <Heart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Medical Conditions</p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>Hypertension (High Blood Pressure)</li>
                      <li>Type 2 Diabetes</li>
                      <li>Asthma</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Current Medications</p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>Lisinopril 10mg (once daily)</li>
                      <li>Metformin 500mg (twice daily)</li>
                      <li>Albuterol inhaler (as needed)</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Allergies</p>
                    <ul className="mt-1 space-y-1 text-sm">
                      <li>Penicillin (severe)</li>
                      <li>Shellfish (moderate)</li>
                      <li>Latex (mild)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nearby" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Medical Facilities</CardTitle>
              <CardDescription>Find hospitals and urgent care centers near you</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Find Nearby Medical Facilities</h3>
              <p className="text-muted-foreground mb-6">
                Click the button below to open Google Maps and find medical facilities near your current location.
              </p>
              <Button asChild>
                <a
                  href="https://www.google.com/maps/search/hospitals+near+me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Open Google Maps
                </a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="mt-6 border-red-200 dark:border-red-800">
        <CardHeader className="bg-red-50 dark:bg-red-950/50">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            {t("emergency_alarm")}
          </CardTitle>
          <CardDescription>{t("activate_alarm_emergency")}</CardDescription>
        </CardHeader>
        <CardContent>
          <EmergencyRinger />
        </CardContent>
      </Card>
    </div>
  )
}
