import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSuccessfulComponent } from './auth-successful.component';

describe('AuthSuccessfulComponent', () => {
  let component: AuthSuccessfulComponent;
  let fixture: ComponentFixture<AuthSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSuccessfulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
