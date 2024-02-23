import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    FontAwesomeModule,
    MatTabsModule,
    CommonModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  isFormDisplayed: boolean = false;
  selectedImage: string | undefined;
  heartIcon = faHeart;
  starIcon = faStar;
  product: any;
  quantity: number = 1;
  initialAmount: number | undefined;
  initialPrice: any;
  addToBuy: any = [];

  constructor(public dataService: DataService, public apiService: APIService) {}

  ngOnInit(): void {
    // this.apiService.getProduct(this.dataService.productId).subscribe((data: Response) =>{
    //   console.log(data);
    // this.product = data;

    // this.apiService.getStore
    // })

    this.product = this.apiService.getProductTemp();
    this.selectedImage = this.product.images[0].url;

    // Iterating over the images array to access each image URL
   
    this.initialPrice = this.product.price;

  }

  increaseQuantity(): void {
    // this.quantity = this.product.quantity;
    this.quantity++;
    this.product.price = this.quantity * this.initialPrice;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    
      this.product.price = this.quantity * this.initialPrice;
      console.log(this.initialPrice);
    }
  }
  showForm(): void {
    this.isFormDisplayed = true;
  }
  hideForm(): void {
    this.isFormDisplayed = false;
  }
  onSubmit(): void {
    this.hideForm();
  }

  switchImage(imageName: string) {
    this.selectedImage = imageName;
  }

  onAddToBuy() {
    this.addToBuy.push(this.product);
    console.log(this.addToBuy);
  }
}
