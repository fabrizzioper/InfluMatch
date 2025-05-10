import { Component, OnInit } from '@angular/core';

interface SuccessCase {
  titleKey: string;
  image: string;
  descKey: string;
}

@Component({
  selector: 'app-success-cases',
  templateUrl: './success-cases.component.html',
  styleUrls: ['./success-cases.component.scss']
})
export class SuccessCasesComponent implements OnInit {
  cases: SuccessCase[] = [];

  ngOnInit(): void {
    this.cases = [
      {
        titleKey: 'SUCCESS_CASES.CASE1_TITLE',
        image: 'assets/images/case1.png',
        descKey: 'SUCCESS_CASES.CASE1_DESC'
      },
      {
        titleKey: 'SUCCESS_CASES.CASE2_TITLE',
        image: 'assets/images/case2.png',
        descKey: 'SUCCESS_CASES.CASE2_DESC'
      },
      {
        titleKey: 'SUCCESS_CASES.CASE3_TITLE',
        image: 'assets/images/case3.png',
        descKey: 'SUCCESS_CASES.CASE3_DESC'
      }
    ];
  }
}
