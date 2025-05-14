import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { Influencer } from '../entities/influencer.entity';
import { Brand } from '../entities/brand.entity';

export interface UserRepository {
  getInfluencers(): Observable<Influencer[]>;
  getBrands(): Observable<Brand[]>;
  getUserById(id: string): Observable<User>;
  updateUser(user: User): Observable<User>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>(
  'UserRepository'
);
