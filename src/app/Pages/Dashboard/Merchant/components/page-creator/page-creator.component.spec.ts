import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreatorComponent } from './page-creator.component';

describe('PageCreatorComponent', () => {
  let component: PageCreatorComponent;
  let fixture: ComponentFixture<PageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
