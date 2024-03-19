import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepTwoComponent } from './onboarding-step-two.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../../../../Services/api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app.routes';

describe('OnboardingStepTwoComponent', () => {
  let component: OnboardingStepTwoComponent;
  let fixture: ComponentFixture<OnboardingStepTwoComponent>;
  let apiService: APIService;
  let router: Router;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [OnboardingStepTwoComponent, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [APIService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(OnboardingStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
