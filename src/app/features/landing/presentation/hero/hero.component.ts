// src/app/features/landing/components/hero/hero.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule, // para directivas básicas
    RouterModule, // para routerLink
    MatButtonModule, // para mat-raised-button
    TranslateModule, // para la pipe | translate
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  // Si necesitas lógica de traducción dinámica, inyecta aquí TranslateService
}
