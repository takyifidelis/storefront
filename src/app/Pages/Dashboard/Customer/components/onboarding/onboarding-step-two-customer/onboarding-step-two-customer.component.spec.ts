import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepTwoCustomerComponent } from './onboarding-step-two-customer.component';

describe('OnboardingStepTwoCustomerComponent', () => {
  let component: OnboardingStepTwoCustomerComponent;
  let fixture: ComponentFixture<OnboardingStepTwoCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStepTwoCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingStepTwoCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
