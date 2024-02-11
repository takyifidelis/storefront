import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEcommerceComponent } from './home-ecommerce.component';

describe('HomeEcommerceComponent', () => {
  let component: HomeEcommerceComponent;
  let fixture: ComponentFixture<HomeEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEcommerceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
