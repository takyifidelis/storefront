import { Component, Inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-template-text-editor-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions,FormsModule,
            CommonModule,CKEditorModule,MatDialogTitle,
            MatDialogContent,MatDialogClose],
  templateUrl: './template-text-editor-dialog.component.html',
  styleUrl: './template-text-editor-dialog.component.scss'
})
export class TemplateTextEditorDialogComponent {
  textContent: string = '';
  public Editor = ClassicEditor;
  constructor(public dialogRef: MatDialogRef<TemplateTextEditorDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: string[]) {}

  saveEditedText(cancelled?: boolean){
    if(cancelled){
      this.dialogRef.close(this.data[0])
    }else{
      this.dialogRef.close(this.textContent)
    }
  }
  ngOnInit(){
    console.log(this.data)
    this.textContent= this.data[0]
  }
}