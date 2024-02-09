import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCustomerComponent } from './signup.component';

describe('SignupCustomerComponent', () => {
  let component: SignupCustomerComponent;
  let fixture: ComponentFixture<SignupCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
