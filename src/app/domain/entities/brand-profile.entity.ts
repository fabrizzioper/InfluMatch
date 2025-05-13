// domain/entities/brand-profile.entity.ts
import { Profile } from './profile.entity';

export class BrandProfile extends Profile {
  constructor(
    userId: string,
    profileCompleted: boolean,
    public displayName: string,
    public bio: string,
    public location: string,
    public contactEmail: string,
    public sector: string,
    public website?: string,
    public budgetRange?: string,
    public objectives?: string,
    public contactName?: string,
    public contactPosition?: string,
    public contentTypes?: string[]
  ) {
    super(userId, profileCompleted);
  }
}
