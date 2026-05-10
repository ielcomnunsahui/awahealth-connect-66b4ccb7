import abicareImg from "@/assets/hospitals/abicare.jpg";
import anchormedImg from "@/assets/hospitals/anchormed.jpg";
import crescentImg from "@/assets/hospitals/crescent.jpg";
import ajifatImg from "@/assets/hospitals/ajifat.jpg";
import pentacareImg from "@/assets/hospitals/pentacare.jpg";
import ibnaduaImg from "@/assets/hospitals/ibnadua.jpg";
import healthplusImg from "@/assets/providers/healthplus.jpg";
import medplusImg from "@/assets/providers/medplus.jpg";
import emzorImg from "@/assets/providers/emzor.jpg";
import synlabImg from "@/assets/providers/synlab.jpg";
import clinixImg from "@/assets/providers/clinix.jpg";
import bridgeImg from "@/assets/providers/bridge.jpg";

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
  image?: string;
  phone?: string;
  lat?: number;
  lng?: number;
};

// Hospitals near University of Ilorin (Tanke), Kwara State
export const providers: Provider[] = [
  { id: "p1", name: "Abicare Hospital", type: "hospital", distance: 0.8, rating: 4.7, reviews: 312, fee: 6000, waitTime: "10 min", open: true, verified: true, address: "1 Peace St, off Awolowo Rd, Tanke, Ilorin", specialties: ["General", "Pediatrics", "24/7 ER"], image: abicareImg, phone: "+2348145233454", lat: 8.4528, lng: 4.6011 },
  { id: "p2", name: "Anchormed Hospital", type: "hospital", distance: 1.1, rating: 4.6, reviews: 188, fee: 7000, waitTime: "15 min", open: true, verified: true, address: "Aniyikaye Street, Tanke / Oko Erin, Ilorin", specialties: ["General", "Maternity", "24/7 ER"], image: anchormedImg, phone: "+2349069142876", lat: 8.4602, lng: 4.5898 },
  { id: "p3", name: "Crescent GC Hospital", type: "hospital", distance: 1.4, rating: 4.5, reviews: 142, fee: 5500, waitTime: "12 min", open: true, verified: true, address: "Olufunmilayo Street, Tanke, Ilorin", specialties: ["General", "Surgery"], image: crescentImg, phone: "+2349088888988", lat: 8.4571, lng: 4.6048 },
  { id: "p4", name: "Ajifat Medical Centre", type: "hospital", distance: 0.6, rating: 4.8, reviews: 421, fee: 8000, waitTime: "8 min", open: true, verified: true, address: "Along Unilorin P/S Road, beside Munirat Filling Station, Tanke", specialties: ["General", "Pediatrics", "Cardiology"], image: ajifatImg, phone: "+2349038690973", lat: 8.4615, lng: 4.5972 },
  { id: "p5", name: "Pentacare Hospital", type: "hospital", distance: 1.9, rating: 4.4, reviews: 96, fee: 6500, waitTime: "20 min", open: true, verified: true, address: "Fate-Tanke Road, behind LGEA Primary School, Ilorin", specialties: ["General", "Maternity"], image: pentacareImg, phone: "+2348038086040", lat: 8.4695, lng: 4.5810 },
  { id: "p6", name: "Ibn Adua Hospital", type: "hospital", distance: 1.2, rating: 4.6, reviews: 174, fee: 7500, waitTime: "12 min", open: true, verified: true, address: "Dr. Dele Gege Street, off Awolowo Rd, Tanke", specialties: ["General", "Surgery", "24/7 ER"], image: ibnaduaImg, phone: "+2348182953777", lat: 8.4549, lng: 4.6065 },
  { id: "p7", name: "HealthPlus Pharmacy", type: "pharmacy", distance: 0.6, rating: 4.7, reviews: 230, fee: 0, waitTime: "Walk-in", open: true, verified: true, address: "Tanke Junction, Ilorin", specialties: ["Prescription", "OTC", "Wellness"], image: healthplusImg, phone: "+2348000000001", lat: 8.4583, lng: 4.6024 },
  { id: "p8", name: "MedPlus Pharmacy", type: "pharmacy", distance: 1.1, rating: 4.4, reviews: 180, fee: 0, waitTime: "Walk-in", open: true, verified: true, address: "Unilorin Main Gate, Ilorin", specialties: ["Prescription", "Delivery"], image: medplusImg, phone: "+2348000000002", lat: 8.4641, lng: 4.6759 },
  { id: "p9", name: "Emzor Pharmacy", type: "pharmacy", distance: 2.0, rating: 4.2, reviews: 95, fee: 0, waitTime: "Walk-in", open: false, verified: true, address: "Fate Road, Ilorin", specialties: ["Prescription", "OTC"], image: emzorImg, phone: "+2348000000003", lat: 8.4742, lng: 4.5740 },
  { id: "p10", name: "Synlab Diagnostics", type: "lab", distance: 1.4, rating: 4.7, reviews: 410, fee: 5000, waitTime: "5 min", open: true, verified: true, address: "Tanke-Oke Odo Rd, Ilorin", specialties: ["Blood Test", "Imaging", "PCR"], image: synlabImg, phone: "+2348000000004", lat: 8.4596, lng: 4.5985 },
  { id: "p11", name: "Clinix Healthcare Lab", type: "lab", distance: 2.3, rating: 4.5, reviews: 220, fee: 3500, waitTime: "10 min", open: true, verified: true, address: "Taiwo Road, Ilorin", specialties: ["Hematology", "Urinalysis"], image: clinixImg, phone: "+2348000000005", lat: 8.4920, lng: 4.5450 },
  { id: "p12", name: "Bridge Clinic Lab", type: "lab", distance: 4.0, rating: 4.6, reviews: 150, fee: 7000, waitTime: "30 min", open: true, verified: false, address: "GRA, Ilorin", specialties: ["Fertility", "Genetics"], image: bridgeImg, phone: "+2348000000006", lat: 8.4796, lng: 4.5398 },
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
