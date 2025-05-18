"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, Brain, AlertCircle, ArrowRight, Loader2 } from "lucide-react"
import { predictDisease } from "@/app/symptoms/actions"
import Link from "next/link"

const commonSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Fatigue",
  "Sore throat",
  "Shortness of breath",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Muscle pain",
  "Joint pain",
  "Chest pain",
  "Abdominal pain",
  "Dizziness",
  "Rash",
  "Blurred vision",
  "Ringing in ears",
  "Loss of appetite",
  "Swollen lymph nodes",
  "Runny nose",
  "Sneezing",
  "Chills",
  "Night sweats",
  "Insomnia",
  "Back pain",
  "Neck pain",
  "Ear pain",
  "Eye pain",
  "Numbness",
  "Tingling",
]

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [customSymptoms, setCustomSymptoms] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const prediction = await predictDisease(selectedSymptoms)
      setResults(prediction)
    } catch (error) {
      console.error("Error predicting disease:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedSymptoms([])
    setCustomSymptoms("")
    setResults(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Symptom Checker</h1>
        <p className="text-muted-foreground">Describe your symptoms to get a preliminary assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className={results ? "opacity-50" : ""}>
            <CardHeader>
              <CardTitle>Enter Your Symptoms</CardTitle>
              <CardDescription>Select from common symptoms or enter your own</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="common">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="common">Common Symptoms</TabsTrigger>
                </TabsList>
                <TabsContent value="common" className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {commonSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={selectedSymptoms.includes(symptom)}
                          onCheckedChange={() => handleSymptomToggle(symptom)}
                          disabled={!!results}
                        />
                        <Label htmlFor={symptom}>{symptom}</Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm} disabled={loading}>
                Clear All
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={(selectedSymptoms.length === 0 && customSymptoms.trim() === "") || loading || !!results}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    Check Symptoms
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Our AI-powered symptom checker</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <Stethoscope className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Enter Your Symptoms</p>
                    <p className="text-sm text-muted-foreground">Select from common symptoms or describe your own</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI model analyzes your symptoms and provides possible conditions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Important Note</p>
                    <p className="text-sm text-muted-foreground">
                      This is not a medical diagnosis. Always consult with a healthcare professional.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {results && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Preliminary Assessment</CardTitle>
            <CardDescription>Based on the symptoms you provided</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Possible Conditions</h3>
                <div className="mt-2 space-y-3">
                  {results.conditions.map((condition: any, index: number) => (
                    <div key={index} className="flex flex-col p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-lg">{condition.name}</p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            condition.probability > 0.7
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : condition.probability > 0.4
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                        >
                          {Math.round(condition.probability * 100)}% match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{condition.description}</p>
                      {condition.recommendation && (
                        <div className="mt-2 p-3 bg-primary/10 rounded-md">
                          <p className="text-sm font-medium">Recommendation:</p>
                          <p className="text-sm">{condition.recommendation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-300">Medical Disclaimer</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      This is not a medical diagnosis. The information provided is for informational purposes only and
                      should not replace professional medical advice. Please consult with a healthcare professional for
                      proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetForm}>
              Check New Symptoms
            </Button>
            <Button asChild>
              <Link href="/appointments/add">Schedule Doctor Appointment</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
