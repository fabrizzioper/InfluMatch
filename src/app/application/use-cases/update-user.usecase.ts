import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository
  ) {}

  execute(user: User): Observable<User> {
    return this.userRepository.updateUser(user);
  }
}
