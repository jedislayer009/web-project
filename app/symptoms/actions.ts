"use server"

// This is a mock implementation of disease prediction
// In a real application, this would connect to a trained ML model
export async function predictDisease(symptoms: string[]) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simple mock logic to return different conditions based on symptoms
  // In a real app, this would use a proper ML model
  const conditions = []

  // Check for cold/flu symptoms
  const coldFluSymptoms = ["Fever", "Cough", "Sore throat", "Fatigue", "Headache", "Runny nose", "Sneezing", "Chills"]
  const coldFluCount = symptoms.filter((s) => coldFluSymptoms.includes(s)).length
  if (coldFluCount >= 2) {
    conditions.push({
      name: "Common Cold or Flu",
      description: "A viral infection affecting the upper respiratory tract",
      probability: Math.min(0.3 + coldFluCount * 0.15, 0.95),
      recommendation:
        "Rest, stay hydrated, and take over-the-counter medications for symptom relief. Consult a doctor if symptoms worsen or persist beyond a week.",
    })
  }

  // Check for allergies
  const allergySymptoms = [
    "Cough",
    "Sore throat",
    "Shortness of breath",
    "Rash",
    "Runny nose",
    "Sneezing",
    "Eye pain",
    "Blurred vision",
  ]
  const allergyCount = symptoms.filter((s) => allergySymptoms.includes(s)).length
  if (allergyCount >= 2) {
    conditions.push({
      name: "Seasonal Allergies",
      description: "An immune response to environmental triggers like pollen",
      probability: Math.min(0.2 + allergyCount * 0.15, 0.9),
      recommendation:
        "Consider over-the-counter antihistamines and avoiding allergen exposure. Consult with an allergist if symptoms are severe or persistent.",
    })
  }

  // Check for migraine
  const migraineSymptoms = ["Headache", "Nausea", "Dizziness", "Fatigue", "Blurred vision", "Ringing in ears"]
  const migraineCount = symptoms.filter((s) => migraineSymptoms.includes(s)).length
  if (migraineCount >= 2) {
    conditions.push({
      name: "Migraine",
      description: "A neurological condition causing severe headaches and other symptoms",
      probability: Math.min(0.3 + migraineCount * 0.2, 0.9),
      recommendation:
        "Rest in a dark, quiet room. Consider over-the-counter pain relievers. If migraines are frequent or severe, schedule an appointment with a neurologist.",
    })
  }

  // Check for gastroenteritis
  const gastroSymptoms = ["Nausea", "Vomiting", "Diarrhea", "Abdominal pain", "Fever", "Loss of appetite"]
  const gastroCount = symptoms.filter((s) => gastroSymptoms.includes(s)).length
  if (gastroCount >= 2) {
    conditions.push({
      name: "Gastroenteritis",
      description: "Inflammation of the digestive tract, often from infection",
      probability: Math.min(0.3 + gastroCount * 0.15, 0.95),
      recommendation:
        "Stay hydrated, rest, and eat bland foods. Seek medical attention if symptoms are severe or persist beyond 48 hours.",
    })
  }

  // Check for COVID-19
  const covidSymptoms = [
    "Fever",
    "Cough",
    "Shortness of breath",
    "Fatigue",
    "Muscle pain",
    "Loss of appetite",
    "Diarrhea",
    "Headache",
  ]
  const covidCount = symptoms.filter((s) => covidSymptoms.includes(s)).length
  if (covidCount >= 3) {
    conditions.push({
      name: "Possible COVID-19",
      description: "A respiratory illness caused by the SARS-CoV-2 virus",
      probability: Math.min(0.3 + covidCount * 0.1, 0.85),
      recommendation:
        "Consider getting tested for COVID-19. Self-isolate and contact a healthcare provider for guidance.",
    })
  }

  // Check for anxiety
  const anxietySymptoms = ["Chest pain", "Shortness of breath", "Dizziness", "Fatigue", "Insomnia", "Headache"]
  const anxietyCount = symptoms.filter((s) => anxietySymptoms.includes(s)).length
  if (anxietyCount >= 3) {
    conditions.push({
      name: "Anxiety",
      description: "A mental health condition characterized by feelings of worry, nervousness, or unease",
      probability: Math.min(0.2 + anxietyCount * 0.15, 0.8),
      recommendation: "Practice relaxation techniques and consider speaking with a mental health professional.",
    })
  }

  // Check for back problems
  const backProblemSymptoms = ["Back pain", "Neck pain", "Numbness", "Tingling", "Muscle pain"]
  const backProblemCount = symptoms.filter((s) => backProblemSymptoms.includes(s)).length
  if (backProblemCount >= 2) {
    conditions.push({
      name: "Musculoskeletal Issue",
      description: "Problems affecting the muscles, bones, or joints of the back",
      probability: Math.min(0.3 + backProblemCount * 0.15, 0.9),
      recommendation:
        "Rest, apply ice/heat, and consider over-the-counter pain relievers. If pain is severe or persistent, consult with a doctor.",
    })
  }

  // If no conditions matched or symptoms list is empty, return general advice
  if (conditions.length === 0) {
    conditions.push({
      name: "Insufficient Information",
      description: "Not enough symptoms to determine a specific condition",
      probability: 0.5,
      recommendation: "Monitor your symptoms and consult with a healthcare professional if they worsen or persist.",
    })
  }

  // Sort by probability
  conditions.sort((a, b) => b.probability - a.probability)

  return {
    conditions,
    advice: "Please consult with a healthcare professional for an accurate diagnosis.",
  }
}
