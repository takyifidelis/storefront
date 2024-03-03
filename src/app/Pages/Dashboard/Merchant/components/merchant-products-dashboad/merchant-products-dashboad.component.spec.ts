import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantProductsDashboadComponent } from './merchant-products-dashboad.component';

describe('MerchantProductsDashboadComponent', () => {
  let component: MerchantProductsDashboadComponent;
  let fixture: ComponentFixture<MerchantProductsDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantProductsDashboadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantProductsDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
