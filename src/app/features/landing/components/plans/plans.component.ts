// src/app/features/landing/components/plans/plans.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

interface Plan {
  nameKey: string;
  price: number;
  period: string;
  features: string[];
  ctaKey: string;
}

@Component({
  selector: 'app-plans',
  standalone: true, // <-- marca como standalone
  imports: [
    CommonModule, // ngFor, ngIf,...
    MatCardModule, // <mat-card>
    MatButtonModule, // <button mat-raised-button>
    TranslateModule, // | translate
  ],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];

  ngOnInit(): void {
    this.plans = [
      /* … tus planes … */
    ];
  }
}
