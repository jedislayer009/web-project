"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"
import { useTranslation } from "@/components/translation-provider"

interface HealthAssessmentProps {
  onComplete: (result: {
    status: "good" | "fair" | "attention"
    score: number
    message: string
  }) => void
  onCancel: () => void
}

export default function HealthAssessment({ onComplete, onCancel }: HealthAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [scores, setScores] = useState<Record<string, number>>({})
  const { t } = useTranslation()

  // Health assessment questions
  const questions = [
    {
      id: "general",
      question: t("how_would_you_rate_overall_health"),
      options: [
        { value: "excellent", label: t("excellent"), score: 10 },
        { value: "good", label: t("good"), score: 8 },
        { value: "fair", label: t("fair"), score: 5 },
        { value: "poor", label: t("poor"), score: 2 },
      ],
    },
    {
      id: "sleep",
      question: t("how_many_hours_sleep"),
      options: [
        { value: "less-than-5", label: t("less_than_5_hours"), score: 2 },
        { value: "5-6", label: t("5_6_hours"), score: 5 },
        { value: "7-8", label: t("7_8_hours"), score: 10 },
        { value: "more-than-8", label: t("more_than_8_hours"), score: 8 },
      ],
    },
    {
      id: "exercise",
      question: t("how_often_exercise"),
      options: [
        { value: "daily", label: t("daily"), score: 10 },
        { value: "few-times-week", label: t("few_times_week"), score: 8 },
        { value: "once-week", label: t("once_week"), score: 5 },
        { value: "rarely", label: t("rarely_never"), score: 2 },
      ],
    },
    {
      id: "diet",
      question: t("how_would_you_describe_diet"),
      options: [
        { value: "very-healthy", label: t("very_healthy_balanced"), score: 10 },
        { value: "mostly-healthy", label: t("mostly_healthy"), score: 8 },
        { value: "somewhat-healthy", label: t("somewhat_healthy"), score: 5 },
        { value: "unhealthy", label: t("mostly_unhealthy"), score: 2 },
      ],
    },
    {
      id: "stress",
      question: t("how_would_you_rate_stress_level"),
      options: [
        { value: "very-low", label: t("very_low"), score: 10 },
        { value: "low", label: t("low"), score: 8 },
        { value: "moderate", label: t("moderate"), score: 5 },
        { value: "high", label: t("high"), score: 2 },
      ],
    },
    {
      id: "chronic",
      question: t("do_you_have_chronic_health_conditions"),
      options: [
        { value: "none", label: t("none"), score: 10 },
        { value: "one", label: t("one_condition_managed"), score: 7 },
        { value: "multiple-managed", label: t("multiple_conditions_managed"), score: 5 },
        { value: "multiple-unmanaged", label: t("multiple_conditions_unmanaged"), score: 2 },
      ],
    },
    {
      id: "medication",
      question: t("how_many_medications_daily"),
      options: [
        { value: "none", label: t("none"), score: 10 },
        { value: "1-2", label: t("one_two_medications"), score: 8 },
        { value: "3-5", label: t("three_five_medications"), score: 5 },
        { value: "more-than-5", label: t("more_than_five_medications"), score: 3 },
      ],
    },
    {
      id: "checkup",
      question: t("when_last_medical_checkup"),
      options: [
        { value: "within-6-months", label: t("within_last_6_months"), score: 10 },
        { value: "within-year", label: t("within_last_year"), score: 8 },
        { value: "1-2-years", label: t("one_two_years_ago"), score: 5 },
        { value: "more-than-2-years", label: t("more_than_2_years_ago"), score: 2 },
      ],
    },
    {
      id: "mental",
      question: t("how_would_you_rate_mental_health"),
      options: [
        { value: "excellent", label: t("excellent"), score: 10 },
        { value: "good", label: t("good"), score: 8 },
        { value: "fair", label: t("fair"), score: 5 },
        { value: "poor", label: t("poor"), score: 2 },
      ],
    },
    {
      id: "energy",
      question: t("how_would_you_rate_energy_levels"),
      options: [
        { value: "high", label: t("high_energy_all_day"), score: 10 },
        { value: "moderate", label: t("moderate_energy_some_dips"), score: 7 },
        { value: "low", label: t("low_energy_frequent_fatigue"), score: 4 },
        { value: "very-low", label: t("very_low_energy_constant_fatigue"), score: 1 },
      ],
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleAnswer = (value: string) => {
    const questionId = currentQuestion.id
    const selectedOption = currentQuestion.options.find((option) => option.value === value)

    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setScores((prev) => ({ ...prev, [questionId]: selectedOption?.score || 0 }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Calculate final score
      const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
      const averageScore = totalScore / questions.length

      // Determine health status
      let status: "good" | "fair" | "attention"
      let message: string

      if (averageScore >= 8) {
        status = "good"
        message = t("health_good_message")
      } else if (averageScore >= 5) {
        status = "fair"
        message = t("health_fair_message")
      } else {
        status = "attention"
        message = t("health_attention_message")
      }

      onComplete({ status, score: Math.round(averageScore * 10) / 10, message })
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

          <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-2">
        <div>
          <Button variant="outline" onClick={currentQuestionIndex === 0 ? onCancel : handlePrevious} size="sm">
            {currentQuestionIndex === 0 ? (
              t("cancel")
            ) : (
              <>
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t("previous")}
              </>
            )}
          </Button>
        </div>

        <Button onClick={handleNext} disabled={!answers[currentQuestion.id]} size="sm">
          {currentQuestionIndex === questions.length - 1 ? (
            <>
              {t("complete")}
              <Check className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              {t("next")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
