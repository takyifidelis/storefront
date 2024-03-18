import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepOneCustomerComponent } from './onboarding-step-one-customer.component';

describe('OnboardingStepOneCustomerComponent', () => {
  let component: OnboardingStepOneCustomerComponent;
  let fixture: ComponentFixture<OnboardingStepOneCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStepOneCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingStepOneCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
