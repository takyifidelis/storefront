import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepOneComponent } from './onboarding-step-one.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app.routes';

describe('OnboardingStepOneComponent', () => {
  let component: OnboardingStepOneComponent;
  let fixture: ComponentFixture<OnboardingStepOneComponent>;
  let router: Router;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [OnboardingStepOneComponent, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });

  beforeEach(()=> {
    router = TestBed.inject(Router);
    router.initialNavigation;
    fixture = TestBed.createComponent(OnboardingStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
