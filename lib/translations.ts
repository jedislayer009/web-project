// This is a simplified translation system
// In a real app, you would use a more robust solution like i18next or react-intl

export type Language = "en" | "hi" | "kn"

export interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

export const translations: Translations = {
  // Add these new keys
  loading: {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    kn: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
  },
  user: {
    en: "User",
    hi: "उपयोगकर्ता",
    kn: "ಬಳಕೆದಾರ",
  },
  dashboard_overview: {
    en: "Your health dashboard overview",
    hi: "आपका स्वास्थ्य डैशबोर्ड अवलोकन",
    kn: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಅವಲೋಕನ",
  },
  your_profile: {
    en: "Your Profile",
    hi: "आपका प्रोफाइल",
    kn: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್",
  },
  personal_account_info: {
    en: "Your personal and account information",
    hi: "आपकी व्यक्तिगत और खाता जानकारी",
    kn: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ಖಾತೆ ಮಾಹಿತಿ",
  },
  full_name: {
    en: "Full Name",
    hi: "पूरा नाम",
    kn: "ಪೂರ್ಣ ಹೆಸರು",
  },
  not_provided: {
    en: "Not provided",
    hi: "प्रदान नहीं किया गया",
    kn: "ಒದಗಿಸಿಲ್ಲ",
  },
  id_number: {
    en: "ID Number",
    hi: "आईडी नंबर",
    kn: "ಐಡಿ ಸಂಖ್ಯೆ",
  },
  not_generated: {
    en: "Not generated",
    hi: "उत्पन्न नहीं हुआ",
    kn: "ರಚಿಸಲಾಗಿಲ್ಲ",
  },
  registered_on: {
    en: "Registered On",
    hi: "पर पंजीकृत",
    kn: "ನೋಂದಾಯಿಸಲಾದ ದಿನಾಂಕ",
  },
  based_on_assessment: {
    en: "Based on your health assessment",
    hi: "आपके स्वास्थ्य मूल्यांकन के आधार पर",
    kn: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನದ ಆಧಾರದ ಮೇಲೆ",
  },
  common_tasks: {
    en: "Common tasks you might need",
    hi: "सामान्य कार्य जिनकी आपको आवश्यकता हो सकती है",
    kn: "ನಿಮಗೆ ಬೇಕಾಗಬಹುದಾದ ಸಾಮಾನ್ಯ ಕಾರ್ಯಗಳು",
  },
  emergency_sos: {
    en: "Emergency SOS",
    hi: "आपातकालीन SOS",
    kn: "ತುರ್ತು SOS",
  },
  view_medications: {
    en: "View Medications",
    hi: "दवाइयां देखें",
    kn: "ಔಷಧಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
  },
  access_records: {
    en: "Access Records",
    hi: "रिकॉर्ड्स एक्सेस करें",
    kn: "ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಿ",
  },

  // Common UI elements
  welcome: {
    en: "Welcome",
    hi: "स्वागत है",
    kn: "ಸ್ವಾಗತ",
  },
  dashboard: {
    en: "Dashboard",
    hi: "डैशबोर्ड",
    kn: "ಡ್ಯಾಶ್‌बೋರ್ड",
  },
  medical_records: {
    en: "Medical Records",
    hi: "चिकित्सा रिकॉर्ड",
    kn: "ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು",
  },
  medications: {
    en: "Medications",
    hi: "दवाइयां",
    kn: "ಔಷಧಿಗಳು",
  },
  symptom_checker: {
    en: "Symptom Checker",
    hi: "लक्षण जांचकर्ता",
    kn: "ರೋಗಲಕ್ಷಣ ಪರಿಶೀಲಕ",
  },
  emergency: {
    en: "Emergency",
    hi: "आपातकालीन",
    kn: "ತುರ್ತು",
  },
  logout: {
    en: "Logout",
    hi: "लॉग आउट",
    kn: "ಲಾಗ್ ಔಟ್",
  },

  // Navigation and common actions
  home: {
    en: "Home",
    hi: "होम",
    kn: "ಮುಖಪುಟ",
  },
  settings: {
    en: "Settings",
    hi: "सेटिंग्स",
    kn: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
  },
  profile: {
    en: "Profile",
    hi: "प्रोफाइल",
    kn: "ಪ್ರೊಫೈಲ್",
  },
  save: {
    en: "Save",
    hi: "सहेजें",
    kn: "ಉಳಿಸಿ",
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें",
    kn: "ರದ್ದುಮಾಡಿ",
  },
  edit: {
    en: "Edit",
    hi: "संपादित करें",
    kn: "ಸಂಪಾದಿಸಿ",
  },
  delete: {
    en: "Delete",
    hi: "हटाएं",
    kn: "ಅಳಿಸಿ",
  },
  add: {
    en: "Add",
    hi: "जोड़ें",
    kn: "ಸೇರಿಸಿ",
  },
  view: {
    en: "View",
    hi: "देखें",
    kn: "ನೋಡಿ",
  },
  download: {
    en: "Download",
    hi: "डाउनलोड करें",
    kn: "ಡೌನ್‌ಲೋಡ್",
  },
  upload: {
    en: "Upload",
    hi: "अपलोड करें",
    kn: "ಅಪ್‌ಲೋಡ್",
  },
  close: {
    en: "Close",
    hi: "बंद करें",
    kn: "ಮುಚ್ಚಿ",
  },
  search: {
    en: "Search",
    hi: "खोजें",
    kn: "ಹುಡುಕಿ",
  },

  // Authentication
  login: {
    en: "Login",
    hi: "लॉगिन",
    kn: "ಲಾಗಿನ್",
  },
  register: {
    en: "Register",
    hi: "रजिस्टर करें",
    kn: "ನೋಂದಣಿ",
  },
  create_account: {
    en: "Create Account",
    hi: "खाता बनाएं",
    kn: "ಖಾತೆ ರಚಿಸಿ",
  },
  unique_id: {
    en: "Unique ID",
    hi: "विशिष्ट आईडी",
    kn: "ಅನನ್ಯ ಐಡಿ",
  },

  // Form fields
  name: {
    en: "Name",
    hi: "नाम",
    kn: "ಹೆಸರು",
  },
  email: {
    en: "Email",
    hi: "ईमेल",
    kn: "ಇಮೇಲ್",
  },
  phone: {
    en: "Phone",
    hi: "फोन",
    kn: "ಫೋನ್",
  },
  password: {
    en: "Password",
    hi: "पासवर्ड",
    kn: "ಪಾಸ್‌ವರ್ಡ್",
  },
  date: {
    en: "Date",
    hi: "तारीख",
    kn: "ದಿನಾಂಕ",
  },
  time: {
    en: "Time",
    hi: "समय",
    kn: "ಸಮಯ",
  },
  description: {
    en: "Description",
    hi: "विवरण",
    kn: "ವಿವರಣೆ",
  },
  notes: {
    en: "Notes",
    hi: "नोट्स",
    kn: "ಟಿಪ್ಪಣಿಗಳು",
  },

  // Dashboard
  health_status: {
    en: "Health Status",
    hi: "स्वास्थ्य स्थिति",
    kn: "ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
  },
  good: {
    en: "Good",
    hi: "अच्छा",
    kn: "ಉತ್ತಮ",
  },
  fair: {
    en: "Fair",
    hi: "ठीक-ठाक",
    kn: "ಮಧ್ಯಮ",
  },
  needs_attention: {
    en: "Needs Attention",
    hi: "ध्यान देने की आवश्यकता है",
    kn: "ಗಮನ ಬೇಕಾಗಿದೆ",
  },
  unknown: {
    en: "Unknown",
    hi: "अज्ञात",
    kn: "ಅज्ञात",
  },
  next_appointment: {
    en: "Next Appointment",
    hi: "अगली अपॉइंटमेंट",
    kn: "ಮುಂದಿನ ಅಪಾಯಿಂಟ್ಮೆಂಟ್",
  },
  medication_due: {
    en: "Medication Due",
    hi: "दवा का समय",
    kn: "ಔಷಧಿ ಬಾಕಿ",
  },
  recent_uploads: {
    en: "Recent Uploads",
    hi: "हाल के अपलोड",
    kn: "ಇತ್ತೀಚಿನ ಅಪ್‌ಲೋಡ್‌ಗಳು",
  },
  recent_activity: {
    en: "Recent Activity",
    hi: "हाल की गतिविधि",
    kn: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
  },
  quick_actions: {
    en: "Quick Actions",
    hi: "त्वरित कार्य",
    kn: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
  },

  // Medical Records
  add_record: {
    en: "Add Record",
    hi: "रिकॉर्ड जोड़ें",
    kn: "ದಾಖಲೆ ಸೇರಿಸಿ",
  },
  upload_documents: {
    en: "Upload Documents",
    hi: "दस्तावेज़ अपलोड करें",
    kn: "ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  record_title: {
    en: "Record Title",
    hi: "रिकॉर्ड शीर्षक",
    kn: "ದಾಖಲೆ ಶೀರ್ಷಿಕೆ",
  },
  record_type: {
    en: "Record Type",
    hi: "रिकॉर्ड प्रकार",
    kn: "ದಾಖಲೆ ಪ್ರಕಾರ",
  },
  healthcare_provider: {
    en: "Healthcare Provider",
    hi: "स्वास्थ्य सेवा प्रदाता",
    kn: "ಆರೋಗ್ಯ ಸೇವಾ ಪೂರೈಕೆದಾರ",
  },
  uploaded_documents: {
    en: "Uploaded Documents",
    hi: "अपलोड किए गए दस्तावेज़",
    kn: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಗಳು",
  },
  medical_records: {
    en: "Medical Records",
    hi: "चिकित्सा रिकॉर्ड",
    kn: "ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು",
  },
  all_documents: {
    en: "All Documents",
    hi: "सभी दस्तावेज़",
    kn: "ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
  },
  lab_results: {
    en: "Lab Results",
    hi: "लैब रिजल्ट",
    kn: "ಪ್ರಯೋಗಾಲಯ ಫಲಿತಾಂಶಗಳು",
  },
  imaging: {
    en: "Imaging",
    hi: "इमेजिंग",
    kn: "ಇಮೇಜಿಂಗ್",
  },

  // Record Types
  check_up: {
    en: "Check-up",
    hi: "चेक-अप",
    kn: "ಚೆಕ್-ಅಪ್",
  },
  lab_test: {
    en: "Lab Test",
    hi: "लैब टेस्ट",
    kn: "ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷೆ",
  },
  specialist_visit: {
    en: "Specialist Visit",
    hi: "विशेषज्ञ का दौरा",
    kn: "ತಜ್ಞರ ಭೇಟಿ",
  },
  vaccination: {
    en: "Vaccination",
    hi: "टीकाकरण",
    kn: "ಲಸಿಕೆ",
  },
  surgery: {
    en: "Surgery",
    hi: "सर्जरी",
    kn: "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
  },

  // Medications
  add_medication: {
    en: "Add Medication",
    hi: "दवा जोड़ें",
    kn: "ಔಷಧಿ ಸೇರಿಸಿ",
  },
  upload_prescription: {
    en: "Upload Prescription",
    hi: "प्रिस्क्रिप्शन अपलोड करें",
    kn: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಶನ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  },
  medication_name: {
    en: "Medication Name",
    hi: "दवा का नाम",
    kn: "ಔಷಧಿಯ ಹೆಸರು",
  },
  dosage: {
    en: "Dosage",
    hi: "खुराक",
    kn: "ಡೋಸೇಜ್",
  },
  frequency: {
    en: "Frequency",
    hi: "आवृत्ति",
    kn: "ಆವರ್ತನ",
  },
  start_date: {
    en: "Start Date",
    hi: "प्रारंभ तिथि",
    kn: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
  },
  end_date: {
    en: "End Date",
    hi: "समाप्ति तिथि",
    kn: "ಅಂತಿಮ ದಿನಾಂಕ",
  },
  instructions: {
    en: "Instructions",
    hi: "निर्देश",
    kn: "ಸೂಚನೆಗಳು",
  },
  quantity: {
    en: "Quantity",
    hi: "मात्रा",
    kn: "ಪ್ರಮಾಣ",
  },
  refills: {
    en: "Refills",
    hi: "रिफिल",
    kn: "ರೀಫಿಲ್ಸ್",
  },
  prescribed_by: {
    en: "Prescribed By",
    hi: "द्वारा निर्धारित",
    kn: "ಇವರಿಂದ ನಿರ್ದೇಶಿಸಲಾಗಿದೆ",
  },
  enable_reminders: {
    en: "Enable Reminders",
    hi: "रिमाइंडर सक्षम करें",
    kn: "ರಿಮೈಂಡರ್‌ಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
  },

  // Frequency options
  once_daily: {
    en: "Once Daily",
    hi: "दिन में एक बार",
    kn: "ದಿನಕ್ಕೊಮ್ಮೆ",
  },
  twice_daily: {
    en: "Twice Daily",
    hi: "दिन में दो बार",
    kn: "ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ",
  },
  three_times_daily: {
    en: "Three Times Daily",
    hi: "दिन में तीन बार",
    kn: "ದಿನಕ್ಕೆ ಮೂರು ಬಾರಿ",
  },
  four_times_daily: {
    en: "Four Times Daily",
    hi: "दिन में चार बार",
    kn: "ದಿನಕ್ಕೆ ನಾಲ್ಕು ಬಾರಿ",
  },
  every_other_day: {
    en: "Every Other Day",
    hi: "हर दूसरे दिन",
    kn: "ಪ್ರತಿ ಎರಡನೇ ದಿನ",
  },
  weekly: {
    en: "Weekly",
    hi: "साप्ताहिक",
    kn: "ವಾರಕ್ಕೊಮ್ಮೆ",
  },
  as_needed: {
    en: "As Needed",
    hi: "जरूरत के अनुसार",
    kn: "ಅಗತ್ಯವಿದ್ದಾಗ",
  },

  // Symptom Checker
  enter_symptoms: {
    en: "Enter Your Symptoms",
    hi: "अपने लक्षण दर्ज करें",
    kn: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ",
  },
  check_symptoms: {
    en: "Check Symptoms",
    hi: "लक्षण जांचें",
    kn: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
  },
  analyzing: {
    en: "Analyzing",
    hi: "विश्लेषण कर रहा है",
    kn: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ",
  },
  clear_all: {
    en: "Clear All",
    hi: "सभी साफ करें",
    kn: "ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ",
  },
  how_it_works: {
    en: "How It Works",
    hi: "यह कैसे काम करता है",
    kn: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
  },
  preliminary_assessment: {
    en: "Preliminary Assessment",
    hi: "प्रारंभिक मूल्यांकन",
    kn: "ಪ್ರಾಥಮಿಕ ಮೌಲ್ಯಮಾಪನ",
  },
  possible_conditions: {
    en: "Possible Conditions",
    hi: "संभावित स्थितियां",
    kn: "ಸಂಭಾವ್ಯ ಸ್ಥಿತಿಗಳು",
  },
  medical_disclaimer: {
    en: "Medical Disclaimer",
    hi: "चिकित्सा अस्वीकरण",
    kn: "ವೈದ್ಯಕೀಯ ಹಕ್ಕುತ್ಯಾಗ",
  },

  // Common symptoms
  fever: {
    en: "Fever",
    hi: "बुखार",
    kn: "ಜ್ವರ",
  },
  cough: {
    en: "Cough",
    hi: "खांसी",
    kn: "ಕೆಮ್ಮು",
  },
  headache: {
    en: "Headache",
    hi: "सिरदर्द",
    kn: "ತಲೆನೋವು",
  },
  fatigue: {
    en: "Fatigue",
    hi: "थकान",
    kn: "ಆಯಾಸ",
  },
  sore_throat: {
    en: "Sore Throat",
    hi: "गले में खराश",
    kn: "ಗಂಟಲು ನೋವು",
  },
  shortness_of_breath: {
    en: "Shortness of Breath",
    hi: "सांस की तकलीफ",
    kn: "ಉಸಿರಾಟದ ತೊಂದರೆ",
  },
  nausea: {
    en: "Nausea",
    hi: "मतली",
    kn: "ವಾಕರಿಕೆ",
  },

  // Emergency
  emergency_contacts: {
    en: "Emergency Contacts",
    hi: "आपातकालीन संपर्क",
    kn: "ತುರ್ತು ಸಂಪರ್ಕಗಳು",
  },
  manage_contacts: {
    en: "Manage Contacts",
    hi: "संपर्क प्रबंधित करें",
    kn: "ಸಂಪರ್ಕಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  },
  add_emergency_contact: {
    en: "Add Emergency Contact",
    hi: "आपातकालीन संपर्क जोड़ें",
    kn: "ತುರ್ತು ಸಂಪರ್ಕವನ್ನು ಸೇರಿಸಿ",
  },
  medical_info: {
    en: "Medical Info",
    hi: "चिकित्सा जानकारी",
    kn: "ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ",
  },
  nearby_facilities: {
    en: "Nearby Facilities",
    hi: "आस-पास की सुविधाएं",
    kn: "ಹತ್ತಿರದ ಸೌಲಭ್ಯಗಳು",
  },
  emergency_alarm: {
    en: "Emergency Alarm",
    hi: "आपातकालीन अलार्म",
    kn: "ತುರ್ತು ಅಲಾರಂ",
  },
  activate_emergency_alarm: {
    en: "Activate Emergency Alarm",
    hi: "आपातकालीन अलार्म सक्रिय करें",
    kn: "ತುರ್ತು ಅಲಾರಂ ಸಕ್ರಿಯಗೊಳಿಸಿ",
  },
  stop_emergency_alarm: {
    en: "Stop Emergency Alarm",
    hi: "आपातकालीन अलार्म बंद करें",
    kn: "ತುರ್ತು ಅಲಾರಂ ನಿಲ್ಲಿಸಿ",
  },
  emergency_alarm_active: {
    en: "Emergency Alarm Active",
    hi: "आपातकालीन अलार्म सक्रिय है",
    kn: "ತುರ್ತು ಅಲಾರಂ ಸಕ್ರಿಯವಾಗಿದೆ",
  },
  seconds_remaining: {
    en: "seconds remaining",
    hi: "सेकंड शेष",
    kn: "ಸೆಕೆಂಡುಗಳು ಉಳಿದಿವೆ",
  },

  // Appointments
  schedule_appointment: {
    en: "Schedule Appointment",
    hi: "अपॉइंटमेंट शेड्यूल करें",
    kn: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಶೆಡ್ಯೂಲ್ ಮಾಡಿ",
  },
  doctor_name: {
    en: "Doctor Name",
    hi: "डॉक्टर का नाम",
    kn: "ವೈದ್ಯರ ಹೆಸರು",
  },
  specialty: {
    en: "Specialty",
    hi: "विशेषज्ञता",
    kn: "ವಿಶೇಷತೆ",
  },
  appointment_type: {
    en: "Appointment Type",
    hi: "अपॉइंटमेंट प्रकार",
    kn: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಪ್ರಕಾರ",
  },
  location: {
    en: "Location",
    hi: "स्थान",
    kn: "ಸ್ಥಳ",
  },
  reason_for_visit: {
    en: "Reason for Visit",
    hi: "विजिट का कारण",
    kn: "ಭೇಟಿಯ ಕಾರಣ",
  },

  // Health Assessment
  health_assessment: {
    en: "Health Assessment",
    hi: "स्वास्थ्य मूल्यांकन",
    kn: "ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ",
  },
  take_health_assessment: {
    en: "Take Health Assessment",
    hi: "स्वास्थ्य मूल्यांकन लें",
    kn: "ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ ತೆಗೆದುಕೊಳ್ಳಿ",
  },
  retake_assessment: {
    en: "Retake Assessment",
    hi: "मूल्यांकन दोबारा लें",
    kn: "ಮೌಲ್ಯಮಾಪನವನ್ನು ಮತ್ತೆ ತೆಗೆದುಕೊಳ್ಳಿ",
  },
  question: {
    en: "Question",
    hi: "प्रश्न",
    kn: "ಪ್ರಶ್ನೆ",
  },
  of: {
    en: "of",
    hi: "का",
    kn: "ರಲ್ಲಿ",
  },
  previous: {
    en: "Previous",
    hi: "पिछला",
    kn: "ಹಿಂದಿನ",
  },
  next: {
    en: "Next",
    hi: "अगला",
    kn: "ಮುಂದಿನ",
  },
  complete: {
    en: "Complete",
    hi: "पूर्ण",
    kn: "ಪೂರ್ಣ",
  },

  // Payments
  payments: {
    en: "Payments",
    hi: "भुगतान",
    kn: "ಪಾವತಿಗಳು",
  },
  outstanding_balance: {
    en: "Outstanding Balance",
    hi: "बकाया राशि",
    kn: "ಬಾಕಿ ಮೊತ್ತ",
  },
  next_payment_due: {
    en: "Next Payment Due",
    hi: "अगला भुगतान देय",
    kn: "ಮುಂದಿನ ಪಾವತಿ ಬಾಕಿ",
  },
  year_to_date_paid: {
    en: "Year-to-Date Paid",
    hi: "वर्ष-से-तिथि तक भुगतान",
    kn: "ವರ್ಷದಿಂದ-ದಿನಾಂಕದವರೆಗೆ ಪಾವತಿಸಲಾಗಿದೆ",
  },
  unpaid_bills: {
    en: "Unpaid Bills",
    hi: "अवैतनिक बिल",
    kn: "ಪಾವತಿಸದ ಬಿಲ್‌ಗಳು",
  },
  payment_history: {
    en: "Payment History",
    hi: "भुगतान इतिहास",
    kn: "ಪಾವತಿ ಇತಿಹಾಸ",
  },
  insurance_claims: {
    en: "Insurance Claims",
    hi: "बीमा दावे",
    kn: "ವಿಮಾ ಕ್ಲೇಮ್‌ಗಳು",
  },
  pay_now: {
    en: "Pay Now",
    hi: "अभी भुगतान करें",
    kn: "ಈಗ ಪಾವತಿಸಿ",
  },
  payment_methods: {
    en: "Payment Methods",
    hi: "भुगतान के तरीके",
    kn: "ಪಾವತಿ ವಿಧಾನಗಳು",
  },
  add_payment_method: {
    en: "Add Payment Method",
    hi: "भुगतान विधि जोड़ें",
    kn: "ಪಾವತಿ ವಿಧಾನವನ್ನು ಸೇರಿಸಿ",
  },

  // Language
  language: {
    en: "Language",
    hi: "भाषा",
    kn: "ಭಾಷೆ",
  },
  select_language: {
    en: "Select language",
    hi: "भाषा चुनें",
    kn: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
  },
  search_language: {
    en: "Search language...",
    hi: "भाषा खोजें...",
    kn: "ಭಾಷೆಯನ್ನು ಹುಡುಕಿ...",
  },
  no_language_found: {
    en: "No language found.",
    hi: "कोई भाषा नहीं मिली।",
    kn: "ಯಾವುದೇ ಭಾಷೆ ಕಂಡುಬಂದಿಲ್ಲ.",
  },
  english: {
    en: "English",
    hi: "अंग्रेज़ी",
    kn: "ಇಂಗ್ಲಿಷ್",
  },
  hindi: {
    en: "Hindi",
    hi: "हिन्दी",
    kn: "ಹಿಂದಿ",
  },
  kannada: {
    en: "Kannada",
    hi: "कन्नड़",
    kn: "ಕನ್ನಡ",
  },
  // Add these new keys for health assessment
  how_would_you_rate_overall_health: {
    en: "How would you rate your overall health?",
    hi: "आप अपने समग्र स्वास्थ्य का मूल्यांकन कैसे करेंगे?",
    kn: "ನಿಮ್ಮ ಒಟ್ಟಾರೆ ಆರೋಗ್ಯವನ್ನು ನೀವು ಹೇಗೆ ರೇಟ್ ಮಾಡುತ್ತೀರಿ?",
  },
  excellent: {
    en: "Excellent",
    hi: "उत्कृष्ट",
    kn: "ಅತ್ಯುತ್ತಮ",
  },
  poor: {
    en: "Poor",
    hi: "खराब",
    kn: "ಕಳಪೆ",
  },
  how_many_hours_sleep: {
    en: "How many hours of sleep do you get on average per night?",
    hi: "आप प्रति रात औसतन कितने घंटे नींद लेते हैं?",
    kn: "ನೀವು ರಾತ್ರಿಗೆ ಸರಾಸರಿ ಎಷ್ಟು ಗಂಟೆಗಳ ನಿದ್ರೆ ಪಡೆಯುತ್ತೀರಿ?",
  },
  less_than_5_hours: {
    en: "Less than 5 hours",
    hi: "5 घंटे से कम",
    kn: "5 ಗಂಟೆಗಿಂತ ಕಡಿಮೆ",
  },
  "5_6_hours": {
    en: "5-6 hours",
    hi: "5-6 घंटे",
    kn: "5-6 ಗಂಟೆಗಳು",
  },
  "7_8_hours": {
    en: "7-8 hours",
    hi: "7-8 घंटे",
    kn: "7-8 ಗಂಟೆಗಳು",
  },
  more_than_8_hours: {
    en: "More than 8 hours",
    hi: "8 घंटे से अधिक",
    kn: "8 ಗಂಟೆಗಿಂತ ಹೆಚ್ಚು",
  },
  how_often_exercise: {
    en: "How often do you exercise?",
    hi: "आप कितनी बार व्यायाम करते हैं?",
    kn: "ನೀವು ಎಷ್ಟು ಬಾರಿ ವ್ಯಾಯಾಮ ಮಾಡುತ್ತೀರಿ?",
  },
  daily: {
    en: "Daily",
    hi: "प्रतिदिन",
    kn: "ದೈನಂದಿನ",
  },
  few_times_week: {
    en: "A few times a week",
    hi: "सप्ताह में कुछ बार",
    kn: "ವಾರಕ್ಕೆ ಕೆಲವು ಬಾರಿ",
  },
  once_week: {
    en: "Once a week",
    hi: "सप्ताह में एक बार",
    kn: "ವಾರಕ್ಕೊಮ್ಮೆ",
  },
  rarely_never: {
    en: "Rarely or never",
    hi: "शायद ही कभी या कभी नहीं",
    kn: "ಅಪರೂಪ ಅಥವಾ ಎಂದಿಗೂ ಇಲ್ಲ",
  },
  health_good_message: {
    en: "Your health indicators look good. Continue maintaining your healthy habits.",
    hi: "आपके स्वास्थ्य संकेतक अच्छे लगते हैं। अपनी स्वस्थ आदतों को बनाए रखें।",
    kn: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸೂಚಕಗಳು ಉತ್ತಮವಾಗಿವೆ. ನಿಮ್ಮ ಆರೋಗ್ಯಕರ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ.",
  },
  health_fair_message: {
    en: "Your health is fair. There are some areas that could use improvement.",
    hi: "आपका स्वास्थ्य ठीक है। कुछ क्षेत्र हैं जिनमें सुधार की आवश्यकता है।",
    kn: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಧ್ಯಮವಾಗಿದೆ. ಸುಧಾರಣೆಗೆ ಕೆಲವು ಕ್ಷೇತ್ರಗಳಿವೆ.",
  },
  health_attention_message: {
    en: "Some aspects of your health need attention. Consider consulting a healthcare professional.",
    hi: "आपके स्वास्थ्य के कुछ पहलुओं पर ध्यान देने की आवश्यकता है। स्वास्थ्य देखभाल पेशेवर से परामर्श करने पर विचार करें।",
    kn: "ನಿಮ್ಮ ಆರೋಗ್ಯದ ಕೆಲವು ಅಂಶಗಳಿಗೆ ಗಮನ ಬೇಕಾಗಿದೆ. ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಲು ಪರಿಗಣಿಸಿ.",
  },
  // Add these new keys for emergency page
  people_to_contact_emergency: {
    en: "People to contact in case of emergency",
    hi: "आपातकाल में संपर्क करने के लिए लोग",
    kn: "ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಸಂಪರ್ಕಿಸಬೇಕಾದ ವ್ಯಕ್ತಿಗಳು",
  },
  manage: {
    en: "Manage",
    hi: "प्रबंधित करें",
    kn: "ನಿರ್ವಹಿಸಿ",
  },
  no_emergency_contacts: {
    en: "No emergency contacts added yet.",
    hi: "अभी तक कोई आपातकालीन संपर्क नहीं जोड़ा गया है।",
    kn: "ಇನ್ನೂ ಯಾವುದೇ ತುರ್ತು ಸಂಪರ್ಕಗಳನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.",
  },
  activate_alarm_emergency: {
    en: "Activate a loud alarm in case of emergency",
    hi: "आपातकाल में एक तेज अलार्म सक्रिय करें",
    kn: "ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಜೋರಾದ ಅಲಾರಂ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
  },
}

export function getTranslation(key: string, language: Language = "en"): string {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }

  return translations[key][language] || translations[key]["en"]
}
