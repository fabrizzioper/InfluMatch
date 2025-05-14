import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profileIncompleteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Primero verificamos si el usuario está autenticado
  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  // Luego verificamos si el perfil está incompleto
  const user = authService.currentUser;
  if (user && user.profile_completed === false) {
    return true; // Permitir acceso a onboarding si el perfil está incompleto
  }

  // Si el perfil ya está completo, redirigir al dashboard
  router.navigate(['/dashboard']);
  return false;
};
