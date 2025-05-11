// src/app/application/use-cases/get-success-cases.usecase.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SuccessCase {
  title: string;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class GetSuccessCasesUseCase {
  /** Devuelve un array de casos de éxito para la landing */
  execute(): Observable<SuccessCase[]> {
    const cases: SuccessCase[] = [
      {
        title: 'SUCCESS_CASES.CASE1_TITLE',
        description: 'SUCCESS_CASES.CASE1_DESC',
        imageUrl: '../../../../../assets/images/case1.png',
      },
      {
        title: 'SUCCESS_CASES.CASE2_TITLE',
        description: 'SUCCESS_CASES.CASE2_DESC',
        imageUrl: '../../../../assets/images/case2.png',
      },
      {
        title: 'SUCCESS_CASES.CASE3_TITLE',
        description: 'SUCCESS_CASES.CASE3_DESC',
        imageUrl: '../../../../../assets/images/case3.png',
      },
    ];
    return of(cases);
  }
}
