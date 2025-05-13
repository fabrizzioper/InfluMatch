import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { UserCredentials } from '../value-objects/user-credentials.vo';

export abstract class AuthRepository {
  abstract login(creds: UserCredentials): Observable<User | null>;
}
