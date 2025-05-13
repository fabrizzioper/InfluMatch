import { ProfileRepository } from '../../domain/repositories/profile-repository';
import { InfluencerProfileVO } from '../../domain/value-objects/influencer-profile.vo';

// application/use-cases/update-influencer-profile.usecase.ts
export class UpdateInfluencerProfileUseCase {
  constructor(private repo: ProfileRepository) {}
  execute(data: InfluencerProfileVO) {
    return this.repo.saveInfluencer(data);
  }
}
