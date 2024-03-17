import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentOptionComponent } from './new-payment-option.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewPaymentOptionComponent', () => {
  let component: NewPaymentOptionComponent;
  let fixture: ComponentFixture<NewPaymentOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPaymentOptionComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewPaymentOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
