import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { UserCredentials } from '../../domain/value-objects/user-credentials.vo';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  // En una aplicación real, esto se conectaría con un repositorio
  execute(credentials: UserCredentials): Observable<User | null> {
    // Simulación de autenticación
    if (
      credentials.email === 'admin@influmatch.com' &&
      credentials.password === 'admin123'
    ) {
      return of({
        id: '1',
        email: credentials.email,
        name: 'Administrador',
        role: 'admin',
        token: 'mock-jwt-token',
      });
    }

    return of(null);
  }
}
