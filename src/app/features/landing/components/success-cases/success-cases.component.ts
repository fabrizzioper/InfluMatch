// src/app/features/landing/components/success-cases/success-cases.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';

interface SuccessCase {
  titleKey: string;
  image: string;
  descKey: string;
}

@Component({
  selector: 'app-success-cases',
  standalone: true,
  imports: [
    CommonModule, // para *ngFor
    MatCardModule, // para <mat-card> y sus directivas
    TranslateModule, // para la pipe | translate
  ],
  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss'],
})
export class SuccessCasesComponent implements OnInit {
  cases: SuccessCase[] = [];

  ngOnInit(): void {
    this.cases = [
      {
        titleKey: 'SUCCESS_CASES.CASE1_TITLE',
        image: 'assets/images/case1.png',
        descKey: 'SUCCESS_CASES.CASE1_DESC',
      },
      {
        titleKey: 'SUCCESS_CASES.CASE2_TITLE',
        image: 'assets/images/case2.png',
        descKey: 'SUCCESS_CASES.CASE2_DESC',
      },
      {
        titleKey: 'SUCCESS_CASES.CASE3_TITLE',
        image: 'assets/images/case3.png',
        descKey: 'SUCCESS_CASES.CASE3_DESC',
      },
    ];
  }
}
