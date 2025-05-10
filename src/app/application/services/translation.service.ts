// src/app/application/services/translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'influMatch-lang';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang$ = new BehaviorSubject<string>(this.getSavedLang());

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.use(this.currentLang$.value);
  }

  /** Cambia el idioma y lo persiste */
  use(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    this.currentLang$.next(lang);
  }

  /** Observable para reaccionar al cambio de idioma */
  onLangChange(): Observable<string> {
    return this.currentLang$.asObservable();
  }

  /** Idioma actual */
  get currentLang(): string {
    return this.currentLang$.value;
  }

  /** Idiomas soportados */
  get supportedLangs(): string[] {
    return ['en', 'es'];
  }

  private getSavedLang(): string {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? saved : 'en';
  }
}
