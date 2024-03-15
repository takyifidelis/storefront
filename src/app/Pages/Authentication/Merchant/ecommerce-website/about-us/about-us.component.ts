import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateTextEditorDialogComponent } from '../../../../Dashboard/Merchant/components/template-text-editor-dialog/template-text-editor-dialog.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  constructor(public dataService: DataService, public dialog: MatDialog){}
  editText(...args: string[]) {
    // console.log(text,args )
    if(this.dataService.isEditingTemp){
      this.dialog.open(TemplateTextEditorDialogComponent, {
        data: args,
        hasBackdrop: false
      }).afterClosed().subscribe((editedtText) => {
        args.shift()
        this.dataService.updateText(editedtText, ...args);
        console.log({editedTex:editedtText}, ...args);
      });
    }
}
}
