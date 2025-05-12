// src/app/infrastructure/api/auth.api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../domain/entities/user.entity';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly base = environment.apiBase;

  constructor(private http: HttpClient) {}

  login(creds: UserCredentials): Observable<User | null> {
    const params = new HttpParams()
      .set('email', creds.email)
      .set('password', creds.password)
      .set('limit', '1');

    return this.http
      .get<User[]>(`${this.base}/users-register`, { params })
      .pipe(map((arr) => (arr.length ? arr[0] : null)));
  }
}
