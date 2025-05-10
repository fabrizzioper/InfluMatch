// src/app/domain/repositories/company-repository.ts
import { Observable } from 'rxjs';
import { Company } from '../entities/company.entity';

export interface CompanyRepository {
  /** Devuelve todas las empresas registradas */
  getAll(): Observable<Company[]>;

  /** Otros métodos de dominio, p.ej. findById(id: string): Observable<Company> **/
}
