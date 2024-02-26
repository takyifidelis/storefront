import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeckoutPageComponent } from './ckeckout-page.component';

describe('CkeckoutPageComponent', () => {
  let component: CkeckoutPageComponent;
  let fixture: ComponentFixture<CkeckoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CkeckoutPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CkeckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
