import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

interface Stat {
  value: string;
  label: string;
}

interface SuccessCase {
  titleKey: string;
  image: string;
  descKey: string;
  stats: Stat[];
}

@Component({
  selector: 'app-success-cases',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss'],
})
export class SuccessCasesComponent implements OnInit {
  cases: SuccessCase[] = [];

  ngOnInit(): void {
    this.initializeCases();
  }

  private initializeCases(): void {
    this.cases = [
      {
        titleKey: 'SUCCESS_CASES.CASE1_TITLE',
        image: 'assets/images/case1.png',
        descKey: 'SUCCESS_CASES.CASE1_DESC',
        stats: [
          { value: '+150%', label: 'SUCCESS_CASES.GROWTH' },
          { value: '2.5M', label: 'SUCCESS_CASES.REACH' },
          { value: '3.2x', label: 'SUCCESS_CASES.ROI' },
        ],
      },
      {
        titleKey: 'SUCCESS_CASES.CASE2_TITLE',
        image: '../assets/images/case2.png',
        descKey: 'SUCCESS_CASES.CASE2_DESC',
        stats: [
          { value: '1M+', label: 'SUCCESS_CASES.FOLLOWERS' },
          { value: '14', label: 'SUCCESS_CASES.DAYS' },
          { value: '8.7%', label: 'SUCCESS_CASES.ENGAGEMENT' },
        ],
      },
      {
        titleKey: 'SUCCESS_CASES.CASE3_TITLE',
        image: 'assets/images/case3.png',
        descKey: 'SUCCESS_CASES.CASE3_DESC',
        stats: [
          { value: '24h', label: 'SUCCESS_CASES.SOLD_OUT' },
          { value: '12', label: 'SUCCESS_CASES.INFLUENCERS' },
          { value: '4.5x', label: 'SUCCESS_CASES.ROI' },
        ],
      },
    ];
  }
}
