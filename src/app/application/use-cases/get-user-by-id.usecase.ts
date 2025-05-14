import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';

export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository
  ) {}

  execute(id: string): Observable<User> {
    return this.userRepository.getUserById(id);
  }
}
