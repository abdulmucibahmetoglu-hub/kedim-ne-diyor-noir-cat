import { Analysis } from "@/types";

const predictions = [
  {
    prediction: "İlgi istiyor",
    confidence: 82,
    explanation: "Kısa, tiz ve tekrarlı miyavlar genelde ilgi ve yakınlık isteğini gösterebilir.",
    suggestion: "Mia ile 5-10 dakika oyun oynayın veya sakince konuşmayı deneyin."
  },
  {
    prediction: "Aç olabilir",
    confidence: 76,
    explanation: "Mama saatine yakın gelen tekrarlı sesler rutin beklentisi veya açlık belirtisi olabilir.",
    suggestion: "Mama ve su kabını kontrol edin."
  },
  {
    prediction: "Oyun istiyor",
    confidence: 71,
    explanation: "Kısa aralıklı ve enerjik sesler oyun daveti olabilir.",
    suggestion: "Kısa bir oyun seansı deneyin."
  },
  {
    prediction: "Rahat ve sakin",
    confidence: 68,
    explanation: "Düşük şiddetli ve kısa sesler rahatlık belirtisi olabilir.",
    suggestion: "Mevcut ortamı koruyun."
  }
];

export function generateMockAnalysis(context: string, catId = "demo-cat", audioUrl?: string | null, duration?: number | null): Omit<Analysis, "id" | "created_at"> {
  const selected =
    context === "Mama"
      ? predictions[1]
      : context === "Oyun"
      ? predictions[2]
      : context === "Gece"
      ? predictions[3]
      : predictions[0];

  return {
    cat_id: catId,
    audio_url: audioUrl || null,
    duration: duration || null,
    context,
    prediction: selected.prediction,
    confidence: selected.confidence,
    explanation: selected.explanation,
    suggestion: selected.suggestion
  };
}
