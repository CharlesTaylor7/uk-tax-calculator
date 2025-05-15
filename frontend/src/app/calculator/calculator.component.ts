import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiData } from '../api-utils';
import { TaxRuleSet, TaxRulesApiService } from '../tax-rules-api.service';
import { TaxSummary, TaxSummaryApiService } from '../tax-summary-api.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  grossAnnualSalary = signal<number | null>(null);
  selectedRuleSetId = signal<number>(1);

  taxRulesService = inject(TaxRulesApiService);
  taxSummaryService = inject(TaxSummaryApiService);

  taxRules = toSignal(this.taxRulesService.taxRules$, {
    initialValue: {
      loading: true,
      error: null,
      data: null,
    },
  });

  taxSummary = signal<ApiData<TaxSummary>>({
    loading: false,
    error: null,
    data: null,
  });

  calculateTax() {
    this.taxSummaryService
      .calculateTax({
        grossAnnualSalary: this.grossAnnualSalary() ?? 0,
        ruleSetId: this.selectedRuleSetId(),
      })
      .subscribe(this.taxSummary.set);
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
