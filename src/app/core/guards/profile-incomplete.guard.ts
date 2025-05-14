import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profileIncompleteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está autenticado y su perfil NO está completo, permitir acceso
  if (
    authService.isAuthenticated &&
    authService.currentUser?.profile_completed === false
  ) {
    return true;
  }

  // Si el usuario está autenticado pero su perfil ya está completo, redirigir al dashboard
  if (authService.isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }

  // Si el usuario no está autenticado, redirigir al login
  router.navigate(['/login']);
  return false;
};
