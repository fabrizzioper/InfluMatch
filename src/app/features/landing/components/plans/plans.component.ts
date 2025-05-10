import { Component, OnInit } from '@angular/core';

interface Plan {
  nameKey: string;
  price: number;
  period: string;
  features: string[];
  ctaKey: string;
}

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans: Plan[] = [];

  ngOnInit(): void {
    this.plans = [
      {
        nameKey: 'PLANS.PLAN1_NAME',
        price: 0,
        period: 'month',
        features: [
          'PLANS.PLAN1_FEATURE1',
          'PLANS.PLAN1_FEATURE2',
          'PLANS.PLAN1_FEATURE3'
        ],
        ctaKey: 'PLANS.PLAN1_CTA'
      },
      {
        nameKey: 'PLANS.PLAN2_NAME',
        price: 49,
        period: 'month',
        features: [
          'PLANS.PLAN2_FEATURE1',
          'PLANS.PLAN2_FEATURE2',
          'PLANS.PLAN2_FEATURE3',
          'PLANS.PLAN2_FEATURE4'
        ],
        ctaKey: 'PLANS.PLAN2_CTA'
      },
      {
        nameKey: 'PLANS.PLAN3_NAME',
        price: 99,
        period: 'month',
        features: [
          'PLANS.PLAN3_FEATURE1',
          'PLANS.PLAN3_FEATURE2',
          'PLANS.PLAN3_FEATURE3',
          'PLANS.PLAN3_FEATURE4',
          'PLANS.PLAN3_FEATURE5'
        ],
        ctaKey: 'PLANS.PLAN3_CTA'
      }
    ];
  }
}
