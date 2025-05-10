import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, type Observable } from 'rxjs';

const STORAGE_KEY = 'influMatch-dark-mode';
const DARK_MODE_CLASS = 'dark-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode$ = new BehaviorSubject<boolean>(false);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

      // Intentar leer del localStorage o usar preferencia del sistema
      const storedPreference = this.readFromStorage();
      const initialDarkMode =
        storedPreference !== null ? storedPreference : prefersDark;

      this.darkMode$.next(initialDarkMode);
      this.applyTheme(initialDarkMode);

      // Escuchar cambios en la preferencia del sistema
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          // Solo cambiar automáticamente si no hay preferencia guardada
          if (this.readFromStorage() === null) {
            this.setDark(e.matches);
          }
        });
    }
  }

  /** Observable para suscribirse a cambios de tema */
  themeChanges(): Observable<boolean> {
    return this.darkMode$.asObservable();
  }

  /** Devuelve estado actual */
  isDark(): boolean {
    return this.darkMode$.value;
  }

  /** Cambia el tema y lo persiste */
  setDark(isDark: boolean): void {
    this.darkMode$.next(isDark);

    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
      this.applyTheme(isDark);
    }
  }

  /** Inicializa tema guardado en localStorage */
  initTheme(): void {
    if (this.isBrowser) {
      const darkMode = this.readFromStorage();
      if (darkMode !== null) {
        this.setDark(darkMode);
      }
    }
  }

  /** Toggle del tema */
  toggleTheme(): void {
    this.setDark(!this.isDark());
  }

  private readFromStorage(): boolean | null {
    if (!this.isBrowser) return null;

    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  private applyTheme(isDark: boolean) {
    if (!this.isBrowser) return;

    const body = document.body;

    if (isDark) {
      body.classList.add(DARK_MODE_CLASS);
    } else {
      body.classList.remove(DARK_MODE_CLASS);
    }

    // Actualizar meta theme-color para que coincida con el tema
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#121212' : '#4051b5');
    }
  }
}
