import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent {
  showInputLink: boolean = false;
  url: any = 'assets/images/ecommerce-home-dresses.svg';

  @ViewChild('fileInput') fileInput!: ElementRef;

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  showLink() {
    this.showInputLink = !this.showInputLink;
  }
  onselectFile(e: any) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
