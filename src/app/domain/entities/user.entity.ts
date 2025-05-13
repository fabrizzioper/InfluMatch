export interface User {
  id: string;
  name: string;
  email: string;
  user_type: string;
  profile_completed: boolean;
  avatar_url?: string;
}
