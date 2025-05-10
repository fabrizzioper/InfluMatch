// src/app/infrastructure/api/company.api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger.service';
import { Company } from '../../domain/entities/company.entity';

@Injectable({
  providedIn: 'root',
})
export class CompanyApi {
  private readonly baseUrl = 'https://api.tuservidor.com/companies';

  constructor(private http: HttpClient, private logger: LoggerService) {}

  /** Obtiene todas las empresas desde la API */
  getAll(): Observable<Company[]> {
    return this.http.get<{ data: any[] }>(`${this.baseUrl}/`).pipe(
      tap(() => this.logger.info('Fetched companies')),
      map((res) => res.data.map((item) => this.toEntity(item)))
    );
  }

  /** Mapea el JSON crudo a la entidad del dominio */
  private toEntity(raw: any): Company {
    return new Company(raw.id, raw.name, raw.industry, raw.logo_url);
  }
}
