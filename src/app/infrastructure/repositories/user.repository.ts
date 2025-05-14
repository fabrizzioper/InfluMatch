import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { Influencer } from '../../domain/entities/influencer.entity';
import { Brand } from '../../domain/entities/brand.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryImpl implements UserRepository {
  private apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  getInfluencers(): Observable<Influencer[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/users-register?user_type=influencer`)
      .pipe(map((data) => data.map((item) => new Influencer(item))));
  }

  getBrands(): Observable<Brand[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/users-register?user_type=marca`)
      .pipe(map((data) => data.map((item) => new Brand(item))));
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/users-register/${id}`).pipe(
      map((data) => {
        if (data.user_type === 'influencer') {
          return new Influencer(data);
        } else {
          return new Brand(data);
        }
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<any>(`${this.apiUrl}/users-register/${user.id}`, user)
      .pipe(
        map((data) => {
          if (data.user_type === 'influencer') {
            return new Influencer(data);
          } else {
            return new Brand(data);
          }
        })
      );
  }
}
