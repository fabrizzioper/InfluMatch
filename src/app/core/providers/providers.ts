import type { Provider } from '@angular/core';
import { USER_REPOSITORY } from '../../domain/repositories/user-repository.interface';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository';

export const appProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepositoryImpl,
  },
];
