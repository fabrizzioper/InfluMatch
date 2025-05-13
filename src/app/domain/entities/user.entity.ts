export interface User {
  id: string;
  name: string;
  email: string;
  rol_type: 'influencer' | 'company' | string;
}
