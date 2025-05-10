import { Injectable } from '@angular/core';
import { BehaviorSubject, type Observable } from 'rxjs';

const STORAGE_KEY = 'influMatch-dark-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode$ = new BehaviorSubject<boolean>(this.readInitial());

  constructor() {
    // Aplica el tema al arrancar
    this.applyClass(this.darkMode$.value);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isDark));
    this.applyClass(isDark);
  }

  /** Inicializa tema guardado en localStorage */
  initTheme(): void {
    this.setDark(this.readInitial());
  }

  private readInitial(): boolean {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'false');
    } catch {
      return false;
    }
  }

  private applyClass(isDark: boolean) {
    const body = document.body;
    if (isDark) body.classList.add('dark-mode');
    else body.classList.remove('dark-mode');
  }
}
