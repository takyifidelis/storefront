import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderModalComponent } from './merchant-order-modal.component';

describe('MerchantOrderModalComponent', () => {
  let component: MerchantOrderModalComponent;
  let fixture: ComponentFixture<MerchantOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantOrderModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
