// src/app/features/landing/components/how-it-works/how-it-works.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface Step {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule, // ngFor, ngIf…
    MatCardModule, // <mat-card>
    MatIconModule, // <mat-icon>
    TranslateModule, // | translate
  ],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      icon: 'person_add',
      titleKey: 'HOW_IT_WORKS.STEP1_TITLE',
      descKey: 'HOW_IT_WORKS.STEP1_DESC',
    },
    {
      icon: 'search',
      titleKey: 'HOW_IT_WORKS.STEP2_TITLE',
      descKey: 'HOW_IT_WORKS.STEP2_DESC',
    },
    {
      icon: 'link',
      titleKey: 'HOW_IT_WORKS.STEP3_TITLE',
      descKey: 'HOW_IT_WORKS.STEP3_DESC',
    },
    {
      icon: 'work',
      titleKey: 'HOW_IT_WORKS.STEP4_TITLE',
      descKey: 'HOW_IT_WORKS.STEP4_DESC',
    },
  ];
}
