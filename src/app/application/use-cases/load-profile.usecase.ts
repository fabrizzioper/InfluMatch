import { ProfileRepository } from '../../domain/repositories/profile-repository';

// application/use-cases/load-profile.usecase.ts
export class LoadProfileUseCase {
  constructor(private repo: ProfileRepository) {}
  execute(userId: string) {
    return this.repo.loadForUser(userId);
  }
}
