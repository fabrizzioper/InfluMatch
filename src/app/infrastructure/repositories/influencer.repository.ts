// src/app/infrastructure/repositories/influencer.repository.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Influencer } from '../../domain/entities/influencer.entity';
import { InfluencerRepository } from '../../domain/repositories/influencer-repository';
import { InfluencerApi } from '../api/influencer.api';

@Injectable({
  providedIn: 'root',
})
export class InfluencerRepositoryImpl implements InfluencerRepository {
  constructor(private api: InfluencerApi) {}

  /** Implementa la interfaz del repositorio devolviendo datos de la API */
  getAll(): Observable<Influencer[]> {
    return this.api.getAll();
  }
}
