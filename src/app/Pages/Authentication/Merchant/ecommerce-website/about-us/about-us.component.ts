import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplateTextEditorDialogComponent } from '../../../../Dashboard/Merchant/components/template-text-editor-dialog/template-text-editor-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageLinkComponent } from '../../../../Dashboard/Merchant/components/image-link/image-link.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
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



// changeImageByLink(pathToProperty:string){
//   this.dialog.open(ImageLinkComponent, {
//     hasBackdrop: false
//   }).afterClosed().subscribe((imageLink) => {
//     const keys = 'templateImages.heroImage'.split('.');
//     const lastKey:any = keys.pop();
//     const targetObj = keys.reduce((acc, key) => {
//     return acc[key];
//   }, this.dataService.template);
//     console.log(imageLink, targetObj[lastKey]);
//   });
// }
onSelectFile(event: any, target: string) {
  const file: File = event.target.files[0]; // Get the selected file
 

  if (event.target.files && event.target.files.length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      switch (target) {
        case 'hero':
          this.dataService.template.templateImages.aboutHeroImage =
            e.target.result;
          break;

        case 'team1':
          this.dataService.template1.aboutUs.team.picture1 =
            e.target.result;
          break;

        case 'team2':
          this.dataService.template1.aboutUs.team.picture2 =
            e.target.result;
          break;
        case 'team3':
          this.dataService.template1.aboutUs.team.picture3 =
            e.target.result;
          break;
        case 'team4':
          this.dataService.template1.aboutUs.team.picture4 =
            e.target.result;
          break;
  
        case 'team5':
          this.dataService.template1.aboutUs.team.picture5 =
            e.target.result;
          break;
  
        case 'team6':
          this.dataService.template1.aboutUs.team.picture6 =
            e.target.result;
          break;
        case 'lastAboutImage':
          console.log(e.target.result);
          this.dataService.template1.templateImages.aboutFooterImage =
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
}
