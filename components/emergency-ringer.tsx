"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Volume2, VolumeX } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/components/translation-provider"

export default function EmergencyRinger() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useTranslation()

  // Initialize audio context on component mount
  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      stopAlarm()
    }
  }, [])

  const startAlarm = () => {
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const audioContext = audioContextRef.current

      // Create oscillator for alarm sound
      const oscillator = audioContext.createOscillator()
      oscillatorRef.current = oscillator

      // Create gain node for volume control
      const gainNode = audioContext.createGain()
      gainNodeRef.current = gainNode

      // Connect nodes
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Configure oscillator for alarm sound
      oscillator.type = "square"
      oscillator.frequency.value = 800

      // Start with full volume
      gainNode.gain.value = 0.5

      // Create pulsing effect
      setInterval(() => {
        if (gainNodeRef.current) {
          const currentGain = gainNodeRef.current.gain.value
          gainNodeRef.current.gain.value = currentGain === 0.5 ? 0.1 : 0.5
        }
      }, 200)

      // Start the oscillator
      oscillator.start()

      setIsPlaying(true)
      setTimeLeft(20)

      // Start countdown timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopAlarm()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      console.error("Error starting alarm:", error)
      alert("There was an error starting the alarm. Please try again.")
    }
  }

  const stopAlarm = () => {
    // Stop oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current = null
    }

    // Clear gain node
    gainNodeRef.current = null

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setIsPlaying(false)
    setTimeLeft(20)
  }

  return (
    <div className="space-y-4">
      {isPlaying ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 animate-pulse">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-bold">{t("emergency_alarm_active")}</span>
            </div>
            <span>
              {timeLeft} {t("seconds_remaining")}
            </span>
          </div>
          <Progress value={(timeLeft / 20) * 100} className="h-2" />
          <Button
            variant="outline"
            className="w-full border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
            onClick={stopAlarm}
          >
            <VolumeX className="mr-2 h-4 w-4" />
            {t("stop_emergency_alarm")}
          </Button>
        </div>
      ) : (
        <Button variant="destructive" className="w-full py-6 text-lg" onClick={startAlarm}>
          <AlertTriangle className="mr-2 h-5 w-5" />
          <Volume2 className="mr-2 h-5 w-5" />
          {t("activate_emergency_alarm")}
        </Button>
      )}
    </div>
  )
}
