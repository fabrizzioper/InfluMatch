import type { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { profileIncompleteGuard } from './core/guards/profile-incomplete.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'onboarding',
    canActivate: [profileIncompleteGuard], // Este guard ya verifica autenticación y estado del perfil
    loadComponent: () =>
      import('./features/auth/pages/onboarding/onboarding.component').then(
        (m) => m.OnboardingComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
