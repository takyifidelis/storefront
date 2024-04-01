import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../Auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastrService: ToastrModule;
  let router: Router;
  let location: Location;

  beforeEach( () => {

    class MockToastrService {
      success(message: string, title?: string, override?: any) {}
      error(message: string, title?: string, override?: any) {}
  }

    const mockLoginService = {
      login: (email: any, password: any) => ({
        subscribe: (callback: any) => {
          if (email === 'business@example.com' && password === 'businesspassword') {
            callback({ data: { type: 'Business', business: '123456' } });
          } else if (email === 'customer@example.com' && password === 'customerpassword') {
            callback({ data: { type: 'Customer', customer: { id: '789', name: 'John Doe' } } });
          } else {
            callback('Invalid credentials');
          }
        }
      })
    };

     TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [{provide: AuthService, useValue: mockLoginService}, {provide: ToastrService, useClass: MockToastrService}]
    })
    .compileComponents(); 
  });

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    router.initialNavigation();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
