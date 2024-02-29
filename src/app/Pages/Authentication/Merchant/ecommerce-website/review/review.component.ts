import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';
import { ProductObject } from '../../../../../interfaces/all-interfaces';

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
    StarRatingComponent
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
  initialPrice?: number;
  addToBuy: any = [];
  likedProducts: any = [];
  amount: number = this.quantity * 90;
  productItem :any
  sizes: string[] | undefined;

constructor(private route: ActivatedRoute,private dataService:DataService,public apiService: APIService){}

  increaseQuantity(): void {
    this.quantity++;
    if(this.initialPrice)
    this.productItem.price = this.quantity * this.initialPrice;
    console.log(this.productItem.price);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if(this.initialPrice)
      this.productItem.price = this.quantity * this.initialPrice;
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
    let cart = JSON.parse(localStorage.getItem('cart')|| '')
    this.productItem.quant =this.quantity;
    cart.push(this.productItem);
    let addTobuyJson = JSON.stringify(cart);
    localStorage.setItem('cart', addTobuyJson);
  
  }

  onLikedProducts(){
    let like = JSON.parse(localStorage.getItem('favouriteProducts')|| '')
    like.push(this.productItem);
    let likedProductsJson = JSON.stringify(like);
    localStorage.setItem('favouriteProducts', likedProductsJson);
    
    let productObj: ProductObject = {
      products: []
    }
    for (const likeditem of like){
      productObj.products.push(likeditem.id)
    }
    this.apiService.addToFavourite(productObj).subscribe((res)=>{
        console.log(res);
      })
  }

  ngOnInit(){
    let productJson = localStorage.getItem('selectedProduct');
    let product = JSON.parse(productJson!);
    this.productItem = product;

    this.selectedImage = this.productItem.images[0].url;
     this.initialPrice = this.productItem.price;

     let values = this.productItem.variations[0].values;
     
      this.sizes = values[0].split(',');
     
    console.log(this.productItem);
    let obj: any = {
      products: []
    }
    // let arrayJson = JSON.stringify(array)
    // let cartJson = localStorage.getItem('favouriteProducts');
    // let cart = JSON.parse(cartJson!);
    // console.log(cart);
    // if(cart){
    //   for (const item of cart){
    //     obj.products.push(item.id)
    //   }
    // }
    // console.log(obj)
   
    // this.apiService.addToFavourite(obj).subscribe((res)=>{
    //   console.log(res)
    // })
    }
    
  }