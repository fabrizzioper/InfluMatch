// domain/value-objects/influencer-profile.vo.ts
export interface InfluencerProfileVO {
  userId: string;
  displayName: string;
  bio: string;
  location: string;
  contactEmail: string;
  niche: string;
  followers: { instagram: number; tiktok: number; youtube: number };
  ratePerPost: number;
  // opcionales...
}
