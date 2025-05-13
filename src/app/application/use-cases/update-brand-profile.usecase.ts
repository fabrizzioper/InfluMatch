import { ProfileRepository } from '../../domain/repositories/profile-repository';
import { BrandProfileVO } from '../../domain/value-objects/brand-profile.vo';

// application/use-cases/update-brand-profile.usecase.ts
export class UpdateBrandProfileUseCase {
  constructor(private repo: ProfileRepository) {}
  execute(data: BrandProfileVO) {
    return this.repo.saveBrand(data);
  }
}
