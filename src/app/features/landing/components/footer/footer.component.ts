// src/app/features/landing/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, // *ngFor, *ngIf (aunque aquí no hagas bucles, es estándar)
    RouterModule, // routerLink
    MatIconModule, // <mat-icon>
    TranslateModule, // | translate
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
