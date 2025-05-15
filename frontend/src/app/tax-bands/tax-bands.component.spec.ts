import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxBandsComponent } from './tax-bands.component';

describe('TaxBandsComponent', () => {
  let component: TaxBandsComponent;
  let fixture: ComponentFixture<TaxBandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxBandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxBandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
