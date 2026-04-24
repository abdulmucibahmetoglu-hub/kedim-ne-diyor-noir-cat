import { Analysis, CareTask, CatProfile, SoundItem } from "@/types";

export const demoCat: CatProfile = {
  id: "demo-cat",
  name: "Mia",
  breed: "British Shorthair",
  age: 2,
  weight: 4.8,
  food_type: "Kuru mama",
  notes: "Noir Cat demo profili"
};

export const demoAnalyses: Analysis[] = [
  {
    id: "demo-a1",
    cat_id: "demo-cat",
    created_at: "Bugün 09:12",
    context: "İlgi",
    prediction: "İlgi istiyor",
    confidence: 82,
    explanation: "Kısa, tiz ve tekrarlı miyavlar genelde ilgi ve yakınlık isteğini gösterebilir.",
    suggestion: "Mia ile 5-10 dakika oyun oynayın veya sakince konuşmayı deneyin."
  },
  {
    id: "demo-a2",
    cat_id: "demo-cat",
    created_at: "Dün 21:05",
    context: "Mama",
    prediction: "Aç olabilir",
    confidence: 74,
    explanation: "Mama saatine yakın tekrarlı sesler açlık veya rutin beklentisi olabilir.",
    suggestion: "Mama ve su kabını kontrol edin."
  }
];

export const careTasks: CareTask[] = [
  { id: "c1", title: "Mama", type: "food", status: "completed" },
  { id: "c2", title: "Su kabı", type: "water", status: "completed" },
  { id: "c3", title: "Kum kabı", type: "litter", status: "pending" },
  { id: "c4", title: "Tüy bakımı", type: "grooming", status: "pending" },
  { id: "c5", title: "Veteriner kontrolü", type: "vet", status: "premium" }
];

export const sounds: SoundItem[] = [
  { id: "s1", title: "Mama çağrısı", category: "Günlük", duration: "0:06", premium: false },
  { id: "s2", title: "Mırlama", category: "Sakinleştirici", duration: "0:12", premium: false },
  { id: "s3", title: "Kuş sesi", category: "Oyun", duration: "0:07", premium: false },
  { id: "s4", title: "Yavru kedi sesi", category: "Premium", duration: "0:09", premium: true }
];

export const moodDistribution = [
  { label: "Meraklı", value: 42 },
  { label: "İlgi istiyor", value: 28 },
  { label: "Oyun istiyor", value: 18 },
  { label: "Rahat", value: 7 },
  { label: "Huzursuz", value: 5 }
];
