import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-link',
  standalone: true,
  imports: [FormsModule, MatIconModule,MatInputModule,MatFormFieldModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './image-link.component.html',
  styleUrl: './image-link.component.scss'
})
export class ImageLinkComponent {
  value = '';
  constructor(public dialogRef: MatDialogRef<ImageLinkComponent>){}
  onReplaceImageWithLink(){
    this.dialogRef.close(this.value);
  }
}
