import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTokenComponent } from './auth-token.component';

describe('AuthTokenComponent', () => {
  let component: AuthTokenComponent;
  let fixture: ComponentFixture<AuthTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthTokenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
