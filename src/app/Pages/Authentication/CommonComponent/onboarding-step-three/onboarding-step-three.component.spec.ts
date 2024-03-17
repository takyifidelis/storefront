import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepThreeComponent } from './onboarding-step-three.component';
import { APIService } from '../../../../Services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OnboardingStepThreeComponent', () => {
  let component: OnboardingStepThreeComponent;
  let fixture: ComponentFixture<OnboardingStepThreeComponent>;
  let apiService: APIService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingStepThreeComponent, HttpClientTestingModule],
      providers: [APIService]
    })
    .compileComponents();
    
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(OnboardingStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
