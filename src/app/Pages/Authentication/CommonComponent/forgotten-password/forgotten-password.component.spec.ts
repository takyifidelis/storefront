import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {Location} from "@angular/common";
import { ForgottenPasswordComponent } from './forgotten-password.component';
import { Routes } from '@angular/router';
import { ResetPassowrdComponent } from '../reset-passowrd/reset-passowrd.component';

describe('ForgottenPasswordComponent', () => {
  let component: ForgottenPasswordComponent;
  let fixture: ComponentFixture<ForgottenPasswordComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ResetPassowrdComponent,RouterTestingModule.withRoutes(
        [
          { path: '', redirectTo: 'forgotten-password', pathMatch: 'full' },
          { path: 'forgotten-password', component: ForgottenPasswordComponent },
          { path: 'reset-password', component: ResetPassowrdComponent },
        ]
      )],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgottenPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test the function with a valid email', () => {
    component.email.value = 'hello@example.com';
    component.validateEmail()
    expect(component.email.isValid).toBeTrue();
  });

  it('should test the function with an empty email', () => {
    component.email.value = '';
    component.validateEmail()
    expect(component.email.isValid).toBeFalse();
  });

  it('should test the function with a invalid email', () => {
    component.email.value = '@example.com';
    component.validateEmail()
    expect(component.email.isValid).toBeFalse();
  });

  it('should test the routing after a valid email', fakeAsync(() => {
    component.email.value = '@example.com';
    component.validateEmail()
    // expect(component.email.isValid).toBeFalse();
    component.email.isValid = true; 
    fixture.debugElement.nativeElement.querySelector('button')
    const location: Location = TestBed.inject(Location);
    fixture.detectChanges();
    // tick()
    expect(location.path()).toBe('');
  }));
});
