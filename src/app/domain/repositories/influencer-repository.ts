// src/app/domain/repositories/influencer-repository.ts
import { Observable } from 'rxjs';
import { Influencer } from '../entities/influencer.entity';

export interface InfluencerRepository {
  /** Devuelve todos los influencers disponibles */
  getAll(): Observable<Influencer[]>;

  /** Podrías añadir más métodos según tu dominio **/
}
