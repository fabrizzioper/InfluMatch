import { Component } from '@angular/core';

interface Step {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      icon: 'person_add',
      titleKey: 'HOW_IT_WORKS.STEP1_TITLE',
      descKey: 'HOW_IT_WORKS.STEP1_DESC'
    },
    {
      icon: 'search',
      titleKey: 'HOW_IT_WORKS.STEP2_TITLE',
      descKey: 'HOW_IT_WORKS.STEP2_DESC'
    },
    {
      icon: 'link',
      titleKey: 'HOW_IT_WORKS.STEP3_TITLE',
      descKey: 'HOW_IT_WORKS.STEP3_DESC'
    },
    {
      icon: 'work',
      titleKey: 'HOW_IT_WORKS.STEP4_TITLE',
      descKey: 'HOW_IT_WORKS.STEP4_DESC'
    }
  ];
}
