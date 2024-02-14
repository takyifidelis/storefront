import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ForgottenPasswordComponent } from './forgotten-password.component';
import { ResetPassowrdComponent } from '../reset-passowrd/reset-passowrd.component';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ForgottenPasswordComponent', () => {
  let router: Router;
  let fixture: ComponentFixture<ForgottenPasswordComponent>;
  let passwordResetFixture: ComponentFixture<ResetPassowrdComponent>;
  let location: Location;
  let dbelement:DebugElement


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ForgottenPasswordComponent,
        ResetPassowrdComponent,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'forgotten-password', pathMatch: 'full' },
          { path: 'forgotten-password', component: ForgottenPasswordComponent },
          { path: 'reset-password', component: ResetPassowrdComponent },
        ]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture = TestBed.createComponent(ForgottenPasswordComponent);
    passwordResetFixture = TestBed.createComponent(ResetPassowrdComponent);
    dbelement = passwordResetFixture.debugElement
  });

  // it('should navigate to the forgotten-password page', waitForAsync(() => {
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     fixture.debugElement.nativeElement.querySelector('button')
  //     expect(location.path()).toBe('/forgotten-password');
  //   });
  // }));
  it('should navigate to the forgotten-password page', waitForAsync(() => {
    passwordResetFixture.detectChanges();
    // passwordResetFixture.debugElement.nativeElement.querySelector('button').click()
    let links = dbelement.queryAll(By.css('button'))
    links[0].nativeElement.click();
    passwordResetFixture.whenStable().then(() => {
      expect(location.path()).toBe('/reset-password');
    });
  }));
});
