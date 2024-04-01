import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ForgottenPasswordComponent } from './forgotten-password.component';
import { ResetPassowrdComponent } from '../reset-passowrd/reset-passowrd.component';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../../../../Services/api.service';
import { Observable, of } from 'rxjs';
import { PasswordResetData } from '../../../../interfaces/all-interfaces';
import { ToastrService } from 'ngx-toastr';

describe('ForgottenPasswordComponent', () => {
  let router: Router;
  let fixture: ComponentFixture<ForgottenPasswordComponent>;
  let passwordResetFixture: ComponentFixture<ResetPassowrdComponent>;
  let location: Location;
  let dbelement:DebugElement
  let apiService: APIService;
  let toastrServce: ToastrService;

  beforeEach(waitForAsync(() => {

    class MockToastrService {
      success(message: string, title?: string, override?: any) {}
      error(message: string, title?: string, override?: any) {}
    }

    class MockService {
      passwordReset(): Observable<PasswordResetData> {
          const passwordReset: PasswordResetData = {
              code: "REQUEST_CODE_CREATED",
              data: {
                  business: null,
                  canResetPassword: false,
                  createdAt: "2024-03-17T23:53:01.142Z",
                  customer: "98ead028-56c5-4796-b199-3f3bd96df80b",
                  email: "selewiw265@hdrlog.com",
                  id: "c6cd2af4-b123-444d-9bc7-981df2dabdd5",
                  isActive: true,
                  mustChangePassword: true,
                  type: "Customer",
                  updatedAt: "2024-03-18T09:47:05.280Z",
                  verified: true,
              },
              message: "Your request has been accepted. A mail has already been sent to your email address with instructions to reset your password.",
                  type: "success"
          }
          return of(passwordReset)
      }
    }
    TestBed.configureTestingModule({
      imports: [
        ForgottenPasswordComponent,
        ResetPassowrdComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'forgotten-password', pathMatch: 'full' },
          { path: 'forgotten-password', component: ForgottenPasswordComponent },
          { path: 'reset-password', component: ResetPassowrdComponent },
        ]),
      ],
      providers: [{provide: APIService, useClass: MockService}, {provide: ToastrService, useClass: MockToastrService}]
    }).compileComponents();
  }));

  beforeEach(() => {
    toastrServce = TestBed.inject(ToastrService);
    apiService = TestBed.inject(APIService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
    fixture = TestBed.createComponent(ForgottenPasswordComponent);
    passwordResetFixture = TestBed.createComponent(ResetPassowrdComponent);
    dbelement = passwordResetFixture.debugElement
  });
  it('should navigate to the forgotten-password page', waitForAsync(() => {
    passwordResetFixture.detectChanges();
    let links = dbelement.queryAll(By.css('button'))
    links[0].nativeElement.click();
    passwordResetFixture.whenStable().then(() => {
      expect(location.path()).toBe('/forgotten-password');
    });
  }));
});
