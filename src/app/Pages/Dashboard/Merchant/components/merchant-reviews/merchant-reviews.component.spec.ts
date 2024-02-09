import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantReviewsComponent } from './merchant-reviews.component';

describe('MerchantReviewsComponent', () => {
  let component: MerchantReviewsComponent;
  let fixture: ComponentFixture<MerchantReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
