// src/app/infrastructure/api/influencer.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger.service';
import { Influencer } from '../../domain/entities/influencer.entity';

@Injectable({
  providedIn: 'root',
})
export class InfluencerApi {
  private readonly baseUrl = 'https://api.tuservidor.com/influencers';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  /** Obtiene todos los influencers desde la API */
  getAll(): Observable<Influencer[]> {
    return this.http.get<{ data: any[] }>(`${this.baseUrl}/`).pipe(
      tap(() => this.logger.info('Fetched influencers')),
      map((res) => res.data.map((item) => this.toEntity(item)))
    );
  }

  /** Mapea el JSON crudo a la entidad del dominio */
  private toEntity(raw: any): Influencer {
    return new Influencer(raw.id, raw.name, raw.bio, raw.avatar_url);
  }
}
