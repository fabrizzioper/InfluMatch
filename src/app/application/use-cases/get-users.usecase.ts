import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user-repository.interface';
import { Influencer } from '../../domain/entities/influencer.entity';
import { Brand } from '../../domain/entities/brand.entity';

@Injectable()
export class GetUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository
  ) {}

  getInfluencers(): Observable<Influencer[]> {
    return this.userRepository.getInfluencers();
  }

  getBrands(): Observable<Brand[]> {
    return this.userRepository.getBrands();
  }
}
