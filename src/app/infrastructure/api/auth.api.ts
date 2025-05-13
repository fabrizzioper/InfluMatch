import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs'; // 👈 importa map desde rxjs 7+
/* si tu proyecto aún usa rxjs <7:
   import { map } from 'rxjs/operators';
*/

import { environment } from '../../../environments/environment';
import { User } from '../../domain/entities/user.entity';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly base = `${environment.apiBase}/users-register`;

  constructor(private http: HttpClient) {}

  login(creds: UserCredentials): Observable<User | null> {
    const params = new HttpParams()
      .set('email', creds.email)
      .set('password', creds.password)
      .set('limit', '1');

    return this.http.get<User[]>(this.base, { params }).pipe(
      map((users: User[]) => (users.length ? users[0] : null)) // 👈 tipa users
    );
  }
}
