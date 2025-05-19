import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxSummaryApiService {
  http = inject(HttpClient);

  calculateTax$(request: CalculateTaxRequest): Observable<TaxSummary> {
    return this.http.get<TaxSummary>('/api/tax', {
      params: {
        grossAnnualSalary: request.grossAnnualSalary,
        ruleSetId: request.ruleSetId,
      },
    });
  }
}

export interface CalculateTaxRequest {
  grossAnnualSalary: number;
  ruleSetId: number;
}

export interface TaxSummary {
  grossAnnualSalary: number;
  grossMonthlySalary: number;
  netAnnualSalary: number;
  netMonthlySalary: number;
  annualTaxPaid: number;
  monthlyTaxPaid: number;
}
