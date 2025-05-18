"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, type File, X, FileImage } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Add this import at the top
import { getUserStorageKey } from "@/lib/utils"

export default function UploadDocuments() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [documentType, setDocumentType] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)

      // Filter for only image files
      const imageFiles = newFiles.filter((file) => {
        const isImage = file.type.startsWith("image/")
        if (!isImage) {
          setError("Only image files are allowed (.jpg, .jpeg, .png, .gif)")
        }
        return isImage
      })

      setFiles((prev) => [...prev, ...imageFiles])

      // Clear error after 3 seconds
      if (error) {
        setTimeout(() => setError(null), 3000)
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Update the handleSubmit function to use user-specific storage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) return

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      // In a real app, you would upload the files to a server
      // For now, we'll just store metadata in localStorage

      const storageKey = getUserStorageKey("uploads")
      const uploads = JSON.parse(localStorage.getItem(storageKey) || "[]")

      const newUploads = files.map((file) => {
        // Create a URL for the image
        const imageUrl = URL.createObjectURL(file)

        return {
          id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: documentType,
          size: file.size,
          description,
          uploadedAt: new Date().toISOString(),
          viewUrl: imageUrl, // Store the blob URL for viewing
          isImage: true,
        }
      })

      localStorage.setItem(storageKey, JSON.stringify([...uploads, ...newUploads]))

      setIsUploading(false)
      setIsComplete(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/records")
      }, 2000)
    }, 1500)
  }

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Upload Complete
            </CardTitle>
            <CardDescription>Your documents have been uploaded successfully</CardDescription>
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
        <h1 className="text-3xl font-bold">Upload Medical Documents</h1>
        <p className="text-muted-foreground">Upload medical reports, test results, or other health documents</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>Supported formats: JPG, PNG, GIF (Max 10MB per file)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid w-full gap-1.5">
              <Label htmlFor="document-type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lab-result">Lab Result</SelectItem>
                  <SelectItem value="imaging">Imaging Report</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="discharge">Discharge Summary</SelectItem>
                  <SelectItem value="referral">Referral Letter</SelectItem>
                  <SelectItem value="insurance">Insurance Document</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the document(s)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="file-upload">Upload Images</Label>
              <div
                className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <FileImage className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">You can upload multiple images at once</p>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files</Label>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-2">
                        <FileImage className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={files.length === 0 || !documentType || isUploading}>
              {isUploading ? "Uploading..." : "Upload Documents"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
