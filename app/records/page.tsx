"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, Upload, FileImage, Eye, X } from "lucide-react"
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

// Add this import at the top
import { getUserStorageKey, getCurrentUser } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface MedicalRecord {
  id: string
  title: string
  type: string
  date: string
  provider: string
  description?: string
  notes?: string
  createdAt: string
}

// Update the interface to include a viewUrl property for simulating document viewing
interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  description: string
  uploadedAt: string
  viewUrl?: string
  isImage?: boolean
}

export default function MedicalRecords() {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [viewingDocument, setViewingDocument] = useState<UploadedDocument | null>(null)
  const router = useRouter()
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])

  // Update the useEffect to load user-specific data
  useEffect(() => {
    const currentUserId = getCurrentUser()

    if (!currentUserId) {
      // If no user is logged in, redirect to login page
      router.push("/login")
      return
    }

    // Load uploaded documents from localStorage using user-specific key
    const storageKey = getUserStorageKey("uploads")
    const storedDocuments = localStorage.getItem(storageKey)
    if (storedDocuments) {
      setUploadedDocuments(JSON.parse(storedDocuments))
    }

    // Load medical records from localStorage using user-specific key
    const medicalRecordsKey = getUserStorageKey("medical_records")
    const storedMedicalRecords = localStorage.getItem(medicalRecordsKey)
    if (storedMedicalRecords) {
      setMedicalRecords(JSON.parse(storedMedicalRecords))
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
  const handleViewDocument = (doc: UploadedDocument) => {
    setViewingDocument(doc)
  }

  // Function to handle document download
  const handleDownloadDocument = (doc: UploadedDocument) => {
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

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Medical Records</h1>
          <p className="text-muted-foreground">Access and manage your uploaded health documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/records/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/records/add">
              <FileText className="mr-2 h-4 w-4" />
              Add Record
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-blue-50 dark:bg-blue-950/50">
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Uploaded Documents
          </CardTitle>
          <CardDescription>Your uploaded medical files and reports</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {uploadedDocuments.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No documents uploaded yet</h3>
              <p className="text-muted-foreground mb-4">Upload your medical documents to keep them organized</p>
              <Button asChild>
                <Link href="/records/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {uploadedDocuments.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileImage className="h-5 w-5 text-blue-500" />
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
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-green-200 dark:border-green-800 mt-6">
        <CardHeader className="bg-green-50 dark:bg-green-950/50">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Medical Records
          </CardTitle>
          <CardDescription>Your added medical records and history</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {medicalRecords.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No medical records added yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your medical records to keep track of your health history
              </p>
              <Button asChild>
                <Link href="/records/add">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Medical Record
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <Card key={record.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()} • {record.provider}
                          </p>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              {record.type.replace("-", " ")}
                            </span>
                          </div>
                          {record.description && <p className="mt-2 text-sm">{record.description}</p>}
                          {record.notes && (
                            <div className="mt-2 p-2 bg-muted rounded-md text-sm">
                              <p className="font-medium">Notes:</p>
                              <p>{record.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="lab">Lab Results</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 pt-4">
          {uploadedDocuments.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p>No documents found. Upload your medical documents to see them here.</p>
              </CardContent>
            </Card>
          ) : (
            uploadedDocuments.map((doc) => (
              <Card key={doc.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <FileImage className="h-5 w-5 text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                        </p>
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {doc.type === "other" ? "Document" : doc.type.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="lab" className="pt-4">
          <Card>
            <CardContent className="py-8">
              {uploadedDocuments.filter((doc) => doc.type === "lab-result").length === 0 ? (
                <div className="text-center">
                  <p>No lab results found. Upload your lab documents to see them here.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/records/upload">Upload Lab Results</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedDocuments
                    .filter((doc) => doc.type === "lab-result")
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <FileImage className="h-5 w-5 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="imaging" className="pt-4">
          <Card>
            <CardContent className="py-8">
              {uploadedDocuments.filter((doc) => doc.type === "imaging").length === 0 ? (
                <div className="text-center">
                  <p>No imaging documents found. Upload your imaging reports to see them here.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/records/upload">Upload Imaging Reports</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedDocuments
                    .filter((doc) => doc.type === "imaging")
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <FileImage className="h-5 w-5 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="other" className="pt-4">
          <Card>
            <CardContent className="py-8">
              {uploadedDocuments.filter((doc) => !["lab-result", "imaging"].includes(doc.type)).length === 0 ? (
                <div className="text-center">
                  <p>No other documents found. Upload your documents to see them here.</p>
                  <Button className="mt-4" asChild>
                    <Link href="/records/upload">Upload Documents</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {uploadedDocuments
                    .filter((doc) => !["lab-result", "imaging"].includes(doc.type))
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <FileImage className="h-5 w-5 text-blue-500" />
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(doc.uploadedAt), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
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
