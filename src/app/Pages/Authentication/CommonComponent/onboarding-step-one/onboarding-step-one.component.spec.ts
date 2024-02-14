import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepOneComponent } from './onboarding-step-one.component';

describe('OnboardingStepOneComponent', () => {
  let component: OnboardingStepOneComponent;
  let fixture: ComponentFixture<OnboardingStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStepOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnboardingStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
