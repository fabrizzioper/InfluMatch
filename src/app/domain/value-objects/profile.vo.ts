export interface ProfileVO {
  user_id: string; // id del usuario
  profile_completed: true; // marcamos como completado
  // campos comunes
  display_name: string;
  avatar_url?: string;
  bio: string;
  // campos para “influencer”
  niche?: string;
  followers_count?: number;
  rate_per_post?: number;
  // campos para “marca”
  sector?: string;
  budget_range?: string;
  objectives?: string;
}
