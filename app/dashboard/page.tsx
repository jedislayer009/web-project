"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Activity,
  Calendar,
  FileText,
  Pill,
  Stethoscope,
  AlertTriangle,
  User,
  Mail,
  Phone,
  CreditCard,
  PlusCircle,
  Upload,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import HealthAssessment from "@/components/health-assessment"
import { formatDistanceToNow } from "date-fns"
import { getCurrentUser, getUserStorageKey } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/components/translation-provider"

interface UserData {
  name: string
  email: string
  phone: string
  idNumber: string
  uniqueId: string
  registeredAt: string
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showHealthAssessment, setShowHealthAssessment] = useState(false)
  const [healthStatus, setHealthStatus] = useState<{
    status: "good" | "fair" | "attention" | "unknown"
    score: number
    message: string
  }>({
    status: "unknown",
    score: 0,
    message: "Complete the health assessment to see your status",
  })
  const [nextAppointment, setNextAppointment] = useState<any>(null)
  const [medicationsDue, setMedicationsDue] = useState<any[]>([])
  const [recentUploads, setRecentUploads] = useState<any[]>([])
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const currentUserId = getCurrentUser()

    if (!currentUserId) {
      // If no user is logged in, redirect to login page
      router.push("/login")
      return
    }

    // Retrieve user data from localStorage
    const storedData = localStorage.getItem(`doktrg_user_${currentUserId}`)
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }

    // Check if health assessment has been completed
    const healthData = localStorage.getItem(getUserStorageKey("health_status"))
    if (healthData) {
      setHealthStatus(JSON.parse(healthData))
    }

    // Load appointments
    const storedAppointments = localStorage.getItem(getUserStorageKey("appointments"))
    if (storedAppointments) {
      const appointments = JSON.parse(storedAppointments)
      // Find the next upcoming appointment
      const now = new Date()
      const upcomingAppointments = appointments
        .filter((appt: any) => {
          const apptDate = new Date(`${appt.date}T${appt.time}`)
          return apptDate > now
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(`${a.date}T${a.time}`)
          const dateB = new Date(`${b.date}T${b.time}`)
          return dateA.getTime() - dateB.getTime()
        })

      if (upcomingAppointments.length > 0) {
        setNextAppointment(upcomingAppointments[0])
      }
    }

    // Load medications
    const storedMedications = localStorage.getItem(getUserStorageKey("medications"))
    if (storedMedications) {
      const medications = JSON.parse(storedMedications)
      // Find medications due in the next 24 hours
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setHours(now.getHours() + 24)

      const dueMeds = medications
        .filter((med: any) => {
          // This is a simplified check - in a real app, you'd check against the medication schedule
          return med.frequency.includes("daily") || med.frequency.includes("twice")
        })
        .slice(0, 3) // Just take up to 3 medications

      setMedicationsDue(dueMeds)
    }

    // Load uploads
    const storedUploads = localStorage.getItem(getUserStorageKey("uploads"))
    if (storedUploads) {
      const uploads = JSON.parse(storedUploads)
      // Sort by upload date, newest first
      const sortedUploads = uploads
        .sort((a: any, b: any) => {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        })
        .slice(0, 3) // Just take the 3 most recent

      setRecentUploads(sortedUploads)
    }

    setLoading(false)
  }, [router])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const handleHealthAssessmentComplete = (result: {
    status: "good" | "fair" | "attention"
    score: number
    message: string
  }) => {
    setHealthStatus(result)
    setShowHealthAssessment(false)

    // Save health status to localStorage with user-specific key
    localStorage.setItem(getUserStorageKey("health_status"), JSON.stringify(result))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">{t("loading")}</div>
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">
          {t("welcome")}, {userData?.name || t("user")}
        </h1>
        <p className="text-muted-foreground">{t("dashboard_overview")}</p>
      </section>

      {/* User Profile Card */}
      <Card className="border-teal-200 dark:border-teal-800">
        <CardHeader className="bg-teal-50 dark:bg-teal-950/50">
          <CardTitle>{t("your_profile")}</CardTitle>
          <CardDescription>{t("personal_account_info")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("full_name")}</p>
                  <p className="font-medium">{userData?.name || t("not_provided")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("email")}</p>
                  <p className="font-medium">{userData?.email || t("not_provided")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("phone")}</p>
                  <p className="font-medium">{userData?.phone || t("not_provided")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t("id_number")}</p>
                  <p className="font-medium">{userData?.idNumber || t("not_provided")}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("unique_id")}</p>
              <p className="font-mono bg-muted p-2 rounded mt-1">{userData?.uniqueId || t("not_generated")}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("registered_on")}</p>
              <p>{userData?.registeredAt ? formatDate(userData.registeredAt) : t("unknown")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Data Entry Options */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Medical Information</CardTitle>
            <CardDescription>Manually enter or upload your medical data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center" asChild>
                <Link href="/records/add">
                  <PlusCircle className="h-10 w-10 mb-2 text-primary" />
                  <span className="font-medium">Add Medical Record</span>
                  <span className="text-xs text-muted-foreground mt-1">Enter test results, diagnoses, etc.</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center" asChild>
                <Link href="/medications/add">
                  <Pill className="h-10 w-10 mb-2 text-primary" />
                  <span className="font-medium">Add Medication</span>
                  <span className="text-xs text-muted-foreground mt-1">Enter medication details and schedule</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center" asChild>
                <Link href="/records/upload">
                  <Upload className="h-10 w-10 mb-2 text-primary" />
                  <span className="font-medium">Upload Documents</span>
                  <span className="text-xs text-muted-foreground mt-1">Upload medical files and reports</span>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto py-4 px-3 flex flex-col items-center justify-center" asChild>
                <Link href="/appointments/add">
                  <Calendar className="h-10 w-10 mb-2 text-primary" />
                  <span className="font-medium">Schedule Appointment</span>
                  <span className="text-xs text-muted-foreground mt-1">Book a visit with your doctor</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Status Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{t("health_status")}</CardTitle>
                <CardDescription>{t("based_on_assessment")}</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            {showHealthAssessment ? (
              <HealthAssessment
                onComplete={handleHealthAssessmentComplete}
                onCancel={() => setShowHealthAssessment(false)}
              />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {healthStatus.status === "good" && (
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  )}
                  {healthStatus.status === "fair" && (
                    <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                  )}
                  {healthStatus.status === "attention" && (
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  )}
                  {healthStatus.status === "unknown" && (
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-gray-500" />
                    </div>
                  )}

                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        healthStatus.status === "good"
                          ? "text-green-600 dark:text-green-400"
                          : healthStatus.status === "fair"
                            ? "text-yellow-600 dark:text-yellow-400"
                            : healthStatus.status === "attention"
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-500"
                      }`}
                    >
                      {healthStatus.status === "good"
                        ? t("good")
                        : healthStatus.status === "fair"
                          ? t("fair")
                          : healthStatus.status === "attention"
                            ? t("needs_attention")
                            : t("unknown")}
                    </h3>
                    <p className="text-sm text-muted-foreground">{healthStatus.message}</p>
                  </div>
                </div>

                {healthStatus.status !== "unknown" && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="text-sm">
                      {healthStatus.status === "good"
                        ? "Keep up the good work! Continue with your healthy habits and regular check-ups."
                        : healthStatus.status === "fair"
                          ? "Consider making some lifestyle improvements and monitoring your health more closely."
                          : "Please consult with a healthcare professional about your health concerns."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!showHealthAssessment && (
              <Button
                onClick={() => setShowHealthAssessment(true)}
                className="w-full"
                variant={healthStatus.status === "unknown" ? "default" : "outline"}
              >
                {healthStatus.status === "unknown" ? t("take_health_assessment") : t("retake_assessment")}
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {nextAppointment ? (
              <>
                <div className="text-2xl font-bold">
                  {new Date(`${nextAppointment.date}T${nextAppointment.time}`).toLocaleDateString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {nextAppointment.doctorName} at{" "}
                  {new Date(`2000-01-01T${nextAppointment.time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">No Upcoming</div>
                <p className="text-xs text-muted-foreground">No appointments scheduled</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medication Due</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {medicationsDue.length > 0 ? (
              <>
                <div className="text-2xl font-bold">{medicationsDue.length}</div>
                <p className="text-xs text-muted-foreground">
                  {medicationsDue.length === 1
                    ? "Medication due in the next 24 hours"
                    : "Medications due in the next 24 hours"}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No medications due soon</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {recentUploads.length > 0 ? (
              <>
                <div className="text-2xl font-bold">{recentUploads.length}</div>
                <p className="text-xs text-muted-foreground">
                  {recentUploads.length === 1 ? "Document uploaded recently" : "Documents uploaded recently"}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">No recent document uploads</p>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest health-related activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.length > 0 && (
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Document uploaded: {recentUploads[0].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(recentUploads[0].uploadedAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              )}

              {medicationsDue.length > 0 && (
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Medication due: {medicationsDue[0].name}</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
              )}

              {nextAppointment && (
                <div className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Upcoming appointment with {nextAppointment.doctorName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(`${nextAppointment.date}T${nextAppointment.time}`).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {!recentUploads.length && !medicationsDue.length && !nextAppointment && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recent activities to display</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/symptoms">
                <Stethoscope className="mr-2 h-4 w-4" />
                {t("check_symptoms")}
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/medications">
                <Pill className="mr-2 h-4 w-4" />
                {t("view_medications")}
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/records">
                <FileText className="mr-2 h-4 w-4" />
                {t("access_records")}
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="destructive" asChild>
              <Link href="/emergency">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {t("emergency_sos")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
