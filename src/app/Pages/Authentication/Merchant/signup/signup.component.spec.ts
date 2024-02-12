import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMerchantComponent } from './signup.component';

describe('SignupMerchantComponent', () => {
  let component: SignupMerchantComponent;
  let fixture: ComponentFixture<SignupMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupMerchantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
