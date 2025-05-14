import { User } from './user.entity';

export class Influencer extends User {
  niche?: string;
  followers?: {
    instagram?: number;
    tiktok?: number;
    youtube?: number;
  };
  rate_per_post?: number;
  engagement_rate?: number;
  main_audience?: string;
  languages?: string;
  portfolio_urls?: string[];
  previous_experience?: string;
  preferred_categories?: string;

  constructor(data: Partial<Influencer>) {
    super(data);
    this.user_type = 'influencer';
    Object.assign(this, data);
  }

  getTotalFollowers(): number {
    if (!this.followers) return 0;
    return (
      (this.followers.instagram || 0) +
      (this.followers.tiktok || 0) +
      (this.followers.youtube || 0)
    );
  }
}
