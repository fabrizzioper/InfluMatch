import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthRepository } from '../../domain/repositories/auth-repository';
import { AuthApi } from '../api/auth.api';
import { User } from '../../domain/entities/user.entity';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';
import { NewUserVO } from '../../domain/value-objects/new-user.vo';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private api: AuthApi) {
    super();
  }

  login(creds: UserCredentials): Observable<User | null> {
    return this.api.login(creds).pipe(
      map((user) =>
        user
          ? { ...user, role: user.user_type ?? 'guest' } // 🔄 adapta el campo
          : null
      )
    );
  }

  register(data: NewUserVO): Observable<User> {
    return this.api.register(data).pipe(
      map((u) => ({ ...u, role: u.user_type ?? 'guest' })) // adapta el campo
    );
  }
}
