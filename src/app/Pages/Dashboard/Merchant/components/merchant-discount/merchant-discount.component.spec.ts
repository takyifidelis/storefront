import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDiscountComponent } from './merchant-discount.component';

describe('MerchantDiscountComponent', () => {
  let component: MerchantDiscountComponent;
  let fixture: ComponentFixture<MerchantDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantDiscountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
