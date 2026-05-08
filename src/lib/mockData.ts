export type Provider = {
  id: string;
  name: string;
  type: "hospital" | "pharmacy" | "lab" | "clinic";
  distance: number;
  rating: number;
  reviews: number;
  fee: number;
  waitTime: string;
  open: boolean;
  verified: boolean;
  address: string;
  specialties: string[];
};

export const providers: Provider[] = [
  { id: "p1", name: "Ajifat Medical Centre", type: "hospital", distance: 1.2, rating: 4.6, reviews: 312, fee: 8000, waitTime: "10 min", open: true, verified: true, address: "12 Allen Ave, Ikeja", specialties: ["General", "Pediatrics", "Cardiology"] },
  { id: "p2", name: "Reddington Hospital", type: "hospital", distance: 2.8, rating: 4.8, reviews: 890, fee: 15000, waitTime: "20 min", open: true, verified: true, address: "Victoria Island, Lagos", specialties: ["Surgery", "Oncology", "ER"] },
  { id: "p3", name: "Lagoon Hospital", type: "hospital", distance: 3.4, rating: 4.5, reviews: 540, fee: 12000, waitTime: "15 min", open: true, verified: true, address: "Apapa, Lagos", specialties: ["General", "Maternity"] },
  { id: "p4", name: "HealthPlus Pharmacy", type: "pharmacy", distance: 0.6, rating: 4.7, reviews: 230, fee: 0, waitTime: "Walk-in", open: true, verified: true, address: "Opebi Rd, Ikeja", specialties: ["Prescription", "OTC", "Wellness"] },
  { id: "p5", name: "MedPlus Pharmacy", type: "pharmacy", distance: 1.1, rating: 4.4, reviews: 180, fee: 0, waitTime: "Walk-in", open: true, verified: true, address: "Awolowo Way", specialties: ["Prescription", "Delivery"] },
  { id: "p6", name: "Emzor Pharmacy", type: "pharmacy", distance: 2.0, rating: 4.2, reviews: 95, fee: 0, waitTime: "Walk-in", open: false, verified: true, address: "Maryland Mall", specialties: ["Prescription", "OTC"] },
  { id: "p7", name: "Synlab Diagnostics", type: "lab", distance: 1.4, rating: 4.7, reviews: 410, fee: 5000, waitTime: "5 min", open: true, verified: true, address: "Adeniyi Jones, Ikeja", specialties: ["Blood Test", "Imaging", "PCR"] },
  { id: "p8", name: "Clinix Healthcare Lab", type: "lab", distance: 2.3, rating: 4.5, reviews: 220, fee: 3500, waitTime: "10 min", open: true, verified: true, address: "Surulere", specialties: ["Hematology", "Urinalysis"] },
  { id: "p9", name: "Bridge Clinic Lab", type: "lab", distance: 4.0, rating: 4.6, reviews: 150, fee: 7000, waitTime: "30 min", open: true, verified: false, address: "Lekki Phase 1", specialties: ["Fertility", "Genetics"] },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  fee: number;
  yearsExp: number;
  available: boolean;
  hospital: string;
  avatar: string;
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Adaeze Okafor", specialty: "General Practitioner", rating: 4.9, fee: 5000, yearsExp: 12, available: true, hospital: "Ajifat Medical Centre", avatar: "AO" },
  { id: "d2", name: "Dr. Tunde Bakare", specialty: "Cardiologist", rating: 4.8, fee: 12000, yearsExp: 18, available: true, hospital: "Reddington Hospital", avatar: "TB" },
  { id: "d3", name: "Dr. Fatima Yusuf", specialty: "Pediatrician", rating: 4.9, fee: 7000, yearsExp: 9, available: false, hospital: "Lagoon Hospital", avatar: "FY" },
  { id: "d4", name: "Dr. Chinedu Eze", specialty: "Dermatologist", rating: 4.7, fee: 9000, yearsExp: 11, available: true, hospital: "Reddington Hospital", avatar: "CE" },
];

export type HistoryItem = {
  id: string;
  date: string;
  type: string;
  provider: string;
  status: "completed" | "ongoing" | "cancelled";
  summary: string;
};

export const history: HistoryItem[] = [
  { id: "h1", date: "2026-04-22", type: "Consultation", provider: "Dr. Adaeze Okafor", status: "completed", summary: "Mild fever — paracetamol prescribed." },
  { id: "h2", date: "2026-04-20", type: "Lab Test", provider: "Synlab Diagnostics", status: "completed", summary: "Full blood count — normal." },
  { id: "h3", date: "2026-04-15", type: "Pharmacy", provider: "HealthPlus Pharmacy", status: "completed", summary: "Picked up Amoxicillin 500mg." },
  { id: "h4", date: "2026-05-02", type: "Consultation", provider: "Dr. Tunde Bakare", status: "ongoing", summary: "Follow-up cardiology review." },
];

export type ProviderRequest = {
  id: string;
  patient: string;
  symptom: string;
  severity: "mild" | "moderate" | "emergency";
  time: string;
  status: "pending" | "accepted" | "completed";
};

export const providerRequests: ProviderRequest[] = [
  { id: "r1", patient: "Amina B.", symptom: "Persistent headache, 3 days", severity: "moderate", time: "2 min ago", status: "pending" },
  { id: "r2", patient: "Kola O.", symptom: "Chest pain, shortness of breath", severity: "emergency", time: "5 min ago", status: "pending" },
  { id: "r3", patient: "Grace I.", symptom: "Sore throat, mild cough", severity: "mild", time: "12 min ago", status: "accepted" },
  { id: "r4", patient: "Samuel A.", symptom: "Lower back pain", severity: "mild", time: "1 hr ago", status: "completed" },
];

export type AdminProvider = {
  id: string;
  name: string;
  type: string;
  status: "verified" | "pending" | "flagged";
  joined: string;
  requests: number;
  revenue: number;
};

export const adminProviders: AdminProvider[] = [
  { id: "a1", name: "Ajifat Medical Centre", type: "Hospital", status: "verified", joined: "2025-11-02", requests: 412, revenue: 3290000 },
  { id: "a2", name: "HealthPlus Pharmacy", type: "Pharmacy", status: "verified", joined: "2025-09-14", requests: 1024, revenue: 1840000 },
  { id: "a3", name: "Bridge Clinic Lab", type: "Lab", status: "pending", joined: "2026-04-30", requests: 0, revenue: 0 },
  { id: "a4", name: "QuickCare Clinic", type: "Clinic", status: "flagged", joined: "2026-02-11", requests: 38, revenue: 124000 },
  { id: "a5", name: "Synlab Diagnostics", type: "Lab", status: "verified", joined: "2025-08-21", requests: 712, revenue: 2150000 },
];

export const formatNaira = (n: number) =>
  n === 0 ? "Free" : "₦" + n.toLocaleString("en-NG");
