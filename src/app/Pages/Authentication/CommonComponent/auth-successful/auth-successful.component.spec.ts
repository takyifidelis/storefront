import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulComponent } from './auth-successful.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

describe('AuthSuccessfulComponent', () => {
  let component: AuthSuccessfulComponent;
  let fixture: ComponentFixture<AuthSuccessfulComponent>;
let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulComponent, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    
    
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    router.initialNavigation;
    fixture = TestBed.createComponent(AuthSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
