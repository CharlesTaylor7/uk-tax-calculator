import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiData } from '../api-utils';
import { TaxRulesApiService } from '../tax-rules-api.service';
import { TaxSummary, TaxSummaryApiService } from '../tax-summary-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  grossAnnualSalary = signal<number | null>(null);
  taxRuleSetId = signal<number | null>(null);
  errorMessage = signal<string>('');

  taxRulesService = inject(TaxRulesApiService);
  taxSummaryService = inject(TaxSummaryApiService);

  taxRules = toSignal(
    this.taxRulesService.taxRules$.pipe(
      tap((result) => {
        // when the dropdown data loads,
        // preselect the first option
        if (result.data?.length) {
          this.taxRuleSetId.set(result.data[0].id);
        }
      }),
    ),
    {
      initialValue: {
        loading: true,
        error: null,
        data: null,
      },
    },
  );

  taxSummary = signal<ApiData<TaxSummary>>({
    loading: false,
    error: null,
    data: null,
  });

  calculateTax() {
    const grossSalary = this.grossAnnualSalary();
    const taxRuleSetId = this.taxRuleSetId();

    const errors = [];
    if (taxRuleSetId == null) {
      errors.push('Tax rule set is required');
    }
    if (grossSalary == null) {
      errors.push('Gross salary is required');
    } else if (grossSalary < 0) {
      errors.push('Gross salary must not be negative ');
    }
    this.errorMessage.set(errors.join('\n'));

    if (!errors.length) {
      this.taxSummaryService
        .calculateTax({
          grossAnnualSalary: grossSalary!,
          ruleSetId: taxRuleSetId!,
        })
        .subscribe(this.taxSummary.set);
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
