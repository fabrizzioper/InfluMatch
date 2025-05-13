import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { AuthRepository } from '../../domain/repositories/auth-repository';
import { AuthApi } from '../api/auth.api';
import { User } from '../../domain/entities/user.entity';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private api: AuthApi) {
    super();
  }

  login(creds: UserCredentials): Observable<User | null> {
    return this.api.login(creds).pipe(
      map((user) =>
        user
          ? { ...user, role: user.rol_type ?? 'guest' } // 🔄 adapta el campo
          : null
      )
    );
  }
}
