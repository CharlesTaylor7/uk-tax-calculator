import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiData, withApiState } from './api-utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaxRulesApiService {
  private apiUrl = '/api/rules';
  http = inject(HttpClient);

  taxRules$: Observable<ApiData<TaxRuleSet[]>> = this.http
    .get<TaxRuleSet[]>(this.apiUrl)
    .pipe(withApiState());

  getRuleSets(): Observable<ApiData<TaxRuleSet[]>> {
    return this.http.get<TaxRuleSet[]>(this.apiUrl).pipe(withApiState());
  }

  createRuleSet(ruleSet: Omit<TaxRuleSet, 'id'>): Observable<TaxRuleSet> {
    return this.http.post<TaxRuleSet>(this.apiUrl, ruleSet);
  }

  updateRuleSet(ruleSet: TaxRuleSet): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${ruleSet.id}`, ruleSet);
  }

  deleteRuleSet(ruleSetId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ruleSetId}`);
  }

  createBand(
    taxRuleSetId: number,
    band: Omit<TaxBand, 'id'>,
  ): Observable<TaxBand> {
    return this.http.post<TaxBand>(
      `${this.apiUrl}/${taxRuleSetId}/bands`,
      band,
    );
  }

  updateBand(band: TaxBand): Observable<TaxBand> {
    return this.http.put<TaxBand>(
      `${this.apiUrl}/${band.taxRuleSetId}/bands/${band.id}`,
      band,
    );
  }

  deleteBand(taxRuleSetId: number, bandId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${taxRuleSetId}/bands/${bandId}`,
    );
  }
}

export interface TaxBand {
  id: number;
  taxRuleSetId: number;
  name: string;
  lowerLimit: number;
  rate: number;
  percentageRate: number;
}

export interface TaxRuleSet {
  id: number;
  name: string;
  taxBands: TaxBand[];
}
