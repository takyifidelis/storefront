import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent {
  showInputLink: boolean = false;

  urls: { [key: number]: string } = {
    1: 'assets/images/ecommerce-home-dresses.svg',
    3: 'assets/images/ecommerce-home-tops.svg',
    4: 'assets/images/ecommerce-home-accesories.svg',
    5: 'assets/images/ecommerce-home-sneakers.svg',
    6: 'assets/images/ecommerce-home-two-ladies.svg',
  };

  inputLinkVisibility: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };

  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(public dataservice:DataService){}
  openFileInput(fileInput: HTMLInputElement, index: number) {
    fileInput.click();
    // Set the visibility of the input link div associated with the clicked button to true
    this.inputLinkVisibility[index] = true;
  }

  showLink() {
    this.showInputLink = !this.showInputLink;
  }
  onSelectFile(event: any, imageNumber: number) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        // Use the image number to update the corresponding URL in the `urls` object.
        this.urls[imageNumber] = e.target.result;
      };
    }
  }
}
