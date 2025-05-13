// domain/value-objects/brand-profile.vo.ts
export interface BrandProfileVO {
  userId: string;
  displayName: string;
  bio: string;
  location: string;
  contactEmail: string;
  sector: string;
  budgetRange: string;
  objectives: string;
  // opcionales...
}
