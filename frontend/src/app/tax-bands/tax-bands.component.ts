import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TaxRulesApiService,
  TaxRuleSet,
  TaxBand,
} from '../tax-rules-api.service';
import { ApiData } from '../api-utils';

@Component({
  selector: 'app-tax-bands',
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-bands.component.html',
  styleUrl: './tax-bands.component.css',
})
export class TaxBandsComponent implements OnInit {
  taxRulesService = inject(TaxRulesApiService);

  ruleSets = signal<TaxRuleSet[]>([]);

  ngOnInit(): void {
    this.loadTaxBands();
  }

  createNewRuleSet(): void {
    this.taxRulesService
      .createRuleSet({ name: `New Tax Rule Set`, taxBands: [] })
      .subscribe((newRuleSet) => {
        this.ruleSets.update((ruleSets) => [...ruleSets, newRuleSet]);
      });
  }

  updateRuleSet(ruleSet: TaxRuleSet): void {
    if (!ruleSet.id) return;

    // Optimistic update already handled by two-way binding with [(ngModel)]
    this.taxRulesService.updateRuleSet(ruleSet).subscribe();
  }

  deleteRuleSet(ruleSet: TaxRuleSet): void {
    const optimisticDelete = () => {
      this.ruleSets.update((ruleSets) =>
        ruleSets.filter((rs) => rs.id !== ruleSet.id),
      );
    };

    if (ruleSet.id) {
      this.taxRulesService
        .deleteRuleSet(ruleSet.id)
        .subscribe(optimisticDelete);
    } else {
      optimisticDelete();
    }
  }

  addBand(ruleSet: TaxRuleSet): void {
    if (!ruleSet.id) return;

    // Find the highest lowerLimit
    const maxLowerLimit = Math.max(
      0,
      ...ruleSet.taxBands.map((band) => band.lowerLimit),
    );

    // Find the next available letter for the band name
    const usedNames = ruleSet.taxBands.map((band) => band.name);
    let nextName = 'A';
    while (usedNames.includes(nextName)) {
      nextName = String.fromCharCode(nextName.charCodeAt(0) + 1);
    }

    // Create a new band with default values
    const newBandData = {
      taxRuleSetId: ruleSet.id,
      name: nextName,
      lowerLimit: maxLowerLimit + 10000,
      percentageRate: 0,
      rate: 0,
    };

    // Immediately save the new band to the server
    this.taxRulesService
      .createBand(ruleSet.id, newBandData)
      .subscribe((createdBand) => {
        // After the server confirms creation, update the local state
        this.ruleSets.update((ruleSets) => {
          return ruleSets.map((rs) => {
            if (rs.id === ruleSet.id) {
              return {
                ...rs,
                taxBands: [...rs.taxBands, createdBand],
              };
            }
            return rs;
          });
        });
      });
  }

  updateBand(band: TaxBand): void {
    if (!band.taxRuleSetId) return;

    this.taxRulesService.updateBand(band).subscribe();
  }

  deleteBand(band: TaxBand): void {
    const optimisticDelete = () => {
      this.ruleSets.update((ruleSets) => {
        return ruleSets.map((rs) => {
          if (rs.id === band.taxRuleSetId) {
            return {
              ...rs,
              taxBands: rs.taxBands.filter((b) => b.id !== band.id),
            };
          }
          return rs;
        });
      });
    };

    this.taxRulesService
      .deleteBand(band.taxRuleSetId, band.id)
      .subscribe(optimisticDelete);
  }

  loadTaxBands(): void {
    const onLoadSuccess = (response: ApiData<TaxRuleSet[]>) => {
      if (response.data) {
        this.ruleSets.set(response.data);
      }
    };

    this.taxRulesService.getRuleSets().subscribe(onLoadSuccess);
  }

  formatCurrency(value: number): string {
    // Format with British currency notation (en-GB locale)
    // This uses commas as thousands separators and periods as decimal separators
    return value.toLocaleString('en-GB', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
}
