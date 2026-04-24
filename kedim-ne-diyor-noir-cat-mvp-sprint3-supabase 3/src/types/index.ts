export type CatProfile = {
  id: string;
  name: string;
  breed?: string | null;
  age?: number | null;
  weight?: number | null;
  gender?: string | null;
  is_neutered?: boolean | null;
  photo_url?: string | null;
  food_type?: string | null;
  notes?: string | null;
  created_at?: string;
};

export type Analysis = {
  id: string;
  cat_id?: string | null;
  user_id?: string | null;
  audio_url?: string | null;
  duration?: number | null;
  context: string;
  prediction: string;
  confidence: number;
  explanation: string;
  suggestion: string;
  user_feedback?: "correct" | "wrong" | null;
  created_at?: string;
};

export type CareTask = {
  id: string;
  cat_id?: string | null;
  title: string;
  type?: string | null;
  due_date?: string | null;
  repeat_rule?: string | null;
  status?: string | null;
  created_at?: string;
};

export type SoundItem = {
  id: string;
  title: string;
  category: string;
  duration: string;
  premium: boolean;
};
