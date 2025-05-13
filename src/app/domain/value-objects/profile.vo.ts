export interface ProfileVO {
  user_id: string;
  profile_completed: boolean;
  display_name: string;
  avatar_url?: string;
  bio: string;
  location?: string;
  contact_email?: string;

  // Campos para influencers
  niche?: string;
  followers?: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
  };
  rate_per_post?: number;
  engagement_rate?: number;
  main_audience?: string;
  languages?: string[];
  social_links?: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  portfolio_urls?: string[];

  // Campos para marcas
  sector?: string;
  website?: string;
  budget_range?: string;
  objectives?: string;
  contact_name?: string;
  contact_position?: string;
  content_types?: string[];
}
