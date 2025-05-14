export class User {
  id!: string;
  name!: string;
  email!: string;
  user_type!: 'influencer' | 'marca';
  profile_completed!: boolean;
  avatar_url?: string;
  display_name?: string;
  bio?: string;
  location?: string;

  // Campos comunes adicionales
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
  };

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
