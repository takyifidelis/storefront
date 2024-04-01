import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TemplateTextEditorDialogComponent } from '../../../../Dashboard/Merchant/components/template-text-editor-dialog/template-text-editor-dialog.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, FormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  constructor(public dataService: DataService,public dialog: MatDialog){}
  editText(...args: string[]) {
    if(this.dataService.isEditingTemp){
      this.dialog.open(TemplateTextEditorDialogComponent, {
        data: args,
        hasBackdrop: false
      }).afterClosed().subscribe((editedtText) => {
        args.shift()
        this.dataService.updateText(editedtText, ...args);
      });
    }
}
  onSelectFile(event: any, target: string) {
    const file: File = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        switch (target) {
          case 'hero':
            this.dataService.template.templateImages.heroImage =
              e.target.result;
            break;
          case 'tSection':
            this.dataService.template.sectionTwo.twoSection.image =
              e.target.result;
            break;
          case 'twoSection':
            this.dataService.template.sectionTwo.twoSection.image =
              e.target.result;
            break;
          default:
            break;
        }
      };
    }
  }
  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
  showLink() {
    this.dataService.showInputLink = !this.dataService.showInputLink;
  }
}