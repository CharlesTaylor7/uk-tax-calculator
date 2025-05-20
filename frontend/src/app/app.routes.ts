import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { TaxBandsComponent } from './tax-bands/tax-bands.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full',
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    title: 'Tax Calculator',
  },
  {
    path: 'tax-rules',
    component: TaxBandsComponent,
    title: 'Tax Rules',
  },
];
