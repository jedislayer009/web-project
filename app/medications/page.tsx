"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pill, Upload, FileImage, Eye, Download, Plus, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { getUserStorageKey, getCurrentUser } from "@/lib/utils"

interface MedicationDocument {
  id: string
  name: string
  type: string
  size: number
  description: string
  uploadedAt: string
  viewUrl?: string
  isImage?: boolean
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  instructions?: string
  notes?: string
  reminders: boolean
  quantity: string
  refills?: string
  prescribedBy?: string
  createdAt: string
}

export default function Medications() {
  const [medicationDocuments, setMedicationDocuments] = useState<MedicationDocument[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingDocument, setViewingDocument] = useState<MedicationDocument | null>(null)

  useEffect(() => {
    const currentUserId = getCurrentUser()

    if (!currentUserId) {
      // If no user is logged in, redirect to login page
      // router.push('/login'); // Requires next/navigation which is not available in this environment
      return
    }

    // Load medication documents from localStorage using user-specific key
    const storageKey = getUserStorageKey("uploads")
    const storedDocuments = localStorage.getItem(storageKey)
    if (storedDocuments) {
      const allDocs = JSON.parse(storedDocuments)
      // Filter for medication-related documents (prescriptions, etc.)
      const medDocs = allDocs.filter(
        (doc: MedicationDocument) =>
          doc.type === "prescription" ||
          doc.type === "medication-list" ||
          doc.type === "pharmacy-receipt" ||
          (doc.description && doc.description.toLowerCase().includes("prescription")) ||
          (doc.name && doc.name.toLowerCase().includes("prescription")),
      )
      setMedicationDocuments(medDocs)
    }

    // Load medications from localStorage using user-specific key
    const medicationsKey = getUserStorageKey("medications")
    const storedMedications = localStorage.getItem(medicationsKey)
    if (storedMedications) {
      setMedications(JSON.parse(storedMedications))
    }

    setLoading(false)
  }, [])

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Function to handle document viewing
  const handleViewDocument = (doc: MedicationDocument) => {
    setViewingDocument(doc)
  }

  // Function to handle document download
  const handleDownloadDocument = (doc: MedicationDocument) => {
    if (!doc.viewUrl) {
      alert("Document URL not available for download")
      return
    }

    // Create a temporary anchor element
    const link = window.document.createElement("a")
    link.href = doc.viewUrl
    link.download = doc.name
    window.document.body.appendChild(link)
    link.click()
    window.document.body.removeChild(link)

    // Show a notification or feedback that download started
    alert(`Download started for ${doc.name}`)
  }

  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Medications</h1>
          <p className="text-muted-foreground">Track and manage your medication schedule</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/medications/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Medication
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/medications/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Prescription
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="medications">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions & Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="medications" className="space-y-6 pt-4">
          {medications.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No medications added yet</h3>
              <p className="text-muted-foreground mb-4">Add your medications to track your schedule</p>
              <Button asChild>
                <Link href="/medications/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {medications.map((medication) => (
                <Card key={medication.id}>
                  <CardHeader>
                    <CardTitle>{medication.name}</CardTitle>
                    <CardDescription>
                      {medication.dosage} • {medication.frequency.replace(/-/g, " ")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                          <p>{formatDate(medication.startDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">End Date</p>
                          <p>{medication.endDate ? formatDate(medication.endDate) : "Ongoing"}</p>
                        </div>
                      </div>

                      {medication.instructions && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Instructions</p>
                          <p>{medication.instructions}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Quantity</p>
                          <p>{medication.quantity}</p>
                        </div>
                        {medication.refills && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Refills</p>
                            <p>{medication.refills}</p>
                          </div>
                        )}
                      </div>

                      {medication.prescribedBy && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Prescribed By</p>
                          <p>{medication.prescribedBy}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 flex justify-between">
                    <p className="text-sm text-muted-foreground">
                      Added {formatDistanceToNow(new Date(medication.createdAt), { addSuffix: true })}
                    </p>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Medication Documents</CardTitle>
                  <CardDescription>Prescriptions and medication-related documents</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/medications/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {medicationDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <FileImage className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No prescriptions uploaded yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your prescriptions to keep them organized</p>
                  <Button asChild>
                    <Link href="/medications/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Prescription
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {medicationDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <FileImage className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                            <span>{doc.type === "other" ? "Document" : doc.type.replace("-", " ")}</span>
                            <span>{formatFileSize(doc.size)}</span>
                            <span>Uploaded {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}</span>
                          </div>
                          {doc.description && <p className="text-sm mt-2">{doc.description}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">View</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Viewer Dialog */}
      <Dialog open={!!viewingDocument} onOpenChange={(open) => !open && setViewingDocument(null)}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{viewingDocument?.name}</DialogTitle>
            <DialogDescription>
              {viewingDocument?.type === "other" ? "Document" : viewingDocument?.type.replace("-", " ")} •{" "}
              {viewingDocument && formatFileSize(viewingDocument.size)}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-muted rounded-md p-2">
            {viewingDocument && (
              <div className="h-full flex items-center justify-center">
                {viewingDocument.viewUrl ? (
                  <img
                    src={viewingDocument.viewUrl || "/placeholder.svg"}
                    alt={viewingDocument.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <FileImage className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg font-medium">Image Preview</p>
                    <p className="text-sm text-muted-foreground mb-4">{viewingDocument.name}</p>
                    <p>Image preview not available.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <DialogClose asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DialogClose>
            <Button onClick={() => viewingDocument && handleDownloadDocument(viewingDocument)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
