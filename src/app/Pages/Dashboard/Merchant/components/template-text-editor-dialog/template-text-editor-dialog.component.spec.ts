import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTextEditorDialogComponent } from './template-text-editor-dialog.component';

describe('TemplateTextEditorDialogComponent', () => {
  let component: TemplateTextEditorDialogComponent;
  let fixture: ComponentFixture<TemplateTextEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTextEditorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateTextEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
