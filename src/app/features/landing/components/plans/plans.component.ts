import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

interface PlanFeature {
  key: string;
  highlighted: boolean;
}

interface Plan {
  nameKey: string;
  descriptionKey: string;
  icon: string;
  price: number;
  features: PlanFeature[];
  ctaKey: string;
  popular: boolean;
}

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    TranslateModule,
  ],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];
  billingPeriod: 'monthly' | 'yearly' = 'monthly';

  ngOnInit(): void {
    this.initializePlans();
  }

  changeBillingPeriod(period: 'monthly' | 'yearly'): void {
    this.billingPeriod = period;
  }

  private initializePlans(): void {
    this.plans = [
      {
        nameKey: 'PLANS.PLAN1_NAME',
        descriptionKey: 'PLANS.PLAN1_DESCRIPTION',
        icon: 'person',
        price: 0,
        features: [
          { key: 'PLANS.PLAN1_FEATURE1', highlighted: false },
          { key: 'PLANS.PLAN1_FEATURE2', highlighted: false },
          { key: 'PLANS.PLAN1_FEATURE3', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN1_CTA',
        popular: false,
      },
      {
        nameKey: 'PLANS.PLAN2_NAME',
        descriptionKey: 'PLANS.PLAN2_DESCRIPTION',
        icon: 'star',
        price: 29,
        features: [
          { key: 'PLANS.PLAN2_FEATURE1', highlighted: true },
          { key: 'PLANS.PLAN2_FEATURE2', highlighted: true },
          { key: 'PLANS.PLAN2_FEATURE3', highlighted: false },
          { key: 'PLANS.PLAN2_FEATURE4', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN2_CTA',
        popular: true,
      },
      {
        nameKey: 'PLANS.PLAN3_NAME',
        descriptionKey: 'PLANS.PLAN3_DESCRIPTION',
        icon: 'workspace_premium',
        price: 79,
        features: [
          { key: 'PLANS.PLAN3_FEATURE1', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE2', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE3', highlighted: true },
          { key: 'PLANS.PLAN3_FEATURE4', highlighted: false },
          { key: 'PLANS.PLAN3_FEATURE5', highlighted: false },
        ],
        ctaKey: 'PLANS.PLAN3_CTA',
        popular: false,
      },
    ];
  }
}
