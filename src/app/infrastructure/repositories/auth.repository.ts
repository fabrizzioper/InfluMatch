// src/app/infrastructure/repositories/auth.repository.ts
import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth-repository';
import { AuthApi } from '../api/auth.api';
import { User } from '../../domain/entities/user.entity';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private api: AuthApi) {
    super();
  }

  login(creds: UserCredentials): Observable<User | null> {
    return this.api.login(creds);
  }
}
