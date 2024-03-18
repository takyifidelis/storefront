import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepThreeComponent } from './onboarding-step-three.component';
import { APIService } from '../../../../Services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

describe('OnboardingStepThreeComponent', () => {
  let component: OnboardingStepThreeComponent;
  let fixture: ComponentFixture<OnboardingStepThreeComponent>;
  let apiService: APIService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStepThreeComponent, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [APIService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    router.initialNavigation;
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(OnboardingStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
