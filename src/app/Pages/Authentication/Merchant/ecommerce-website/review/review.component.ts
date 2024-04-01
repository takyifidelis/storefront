import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';
import {
  ProductObject,
  SingleProductResponseData,
  Varaiation,
  oneProduct,
} from '../../../../../interfaces/all-interfaces';
import { AuthService } from '../../../Auth/auth.service';

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
    StarRatingComponent,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  isFormDisplayed: boolean = false;
  selectedImage: string | undefined;
  heartIcon = faHeart;
  starIcon = faStar;
  quantity: number = 1;
  initialPrice?: number;
  addToBuy: any = [];
  likedProducts: any = [];
  myVariation: any;
  amount: number = this.quantity * 90;
  productItem: any;
  similarProducts: any = [];
  numberOfReviews!: number;

  cart: any = [];
  variations?: Varaiation[] = [];
  productReview: any;
  values?: string[];
  newSelectedProduct: any;

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    public apiService: APIService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  increaseQuantity(): void {
    this.quantity++;
    if (this.initialPrice)
      this.productItem.price = this.quantity * this.initialPrice;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      if (this.initialPrice)
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
    this.toastr.info('Product has been added to cart', 'Success');
    this.productItem.quant = this.quantity;
    this.dataService.cart.push(this.productItem);
    let addTobuyJson = JSON.stringify(this.dataService.cart);
    localStorage.setItem('cart', addTobuyJson);

    let productObj: ProductObject = {
      products: [],
    };

    for (const item of this.dataService.cart) {
      productObj.products.push(item.id);
    }

    this.apiService
      .addTOViews(productObj, localStorage.getItem('customerId')!)
      .subscribe(
        (res) => {
          this.toastr.info('Product has been added to cart', 'Success');
        },
        (errorMessage) => {}
      );
  }

  onAddOneToBuy(product: any) {
    product.quant = 1;
    this.dataService.cart.push(this.productItem);
    let addTobuyJson = JSON.stringify(this.dataService.cart);
    localStorage.setItem('cart', addTobuyJson);

    let productObj: ProductObject = {
      products: [],
    };

    for (const item of this.dataService.cart) {
      productObj.products.push(item.id);
    }
    this.apiService
      .addTOViews(productObj, localStorage.getItem('customerId')!)
      .subscribe((res) => {
        this.toastr.info('Product has been added to cart', 'Success');
      });
  }

  onLikedProducts() {
    this.toastr.info('Product has been added to favorites', 'Success');
    this.productItem.quant = this.quantity;
    this.dataService.like.push(this.productItem);
    let likedProductsJson = JSON.stringify(this.dataService.like);
    localStorage.setItem('favouriteProducts', likedProductsJson);

    let productObj: ProductObject = {
      products: [],
    };

    for (const likeditem of this.dataService.like) {
      productObj.products.push(likeditem.id);
    }

    this.apiService
      .addToFavourite(productObj, localStorage.getItem('customerId')!)
      .subscribe((res) => {});
  }

  onLikeOne(product: any) {
    this.productItem.quant = 1;
    product.isliked = !product.isliked;
    this.dataService.like = JSON.parse(
      localStorage.getItem('favouriteProducts') || ''
    );
    this.dataService.like.push(this.productItem);
    let productObj: ProductObject = {
      products: [],
    };
    for (const likeditem of this.dataService.like) {
      productObj.products.push(likeditem.id);
    }
    this.apiService
      .addToFavourite(productObj, localStorage.getItem('customerId')!)
      .subscribe((res) => {});
  }
  ngOnInit() {
    let productJson = localStorage.getItem('selectedProduct');
    let product:oneProduct = JSON.parse(productJson!);
    this.productItem = product;
    this.dataService.isLoading = true;
    this.selectedImage = this.productItem?.images[0].url;

    this.initialPrice = this.productItem.price;
    this.apiService
      .getCustomerStoreProducts(localStorage.getItem('storeId')!)
      .subscribe((res: any) => {
        this.myVariation = res.data.variations;
        this.numberOfReviews = this.productItem.reviews.length;
        res.data.filter((product: any) => {
          if (product.category === this.productItem.category) {
            this.similarProducts.push(product);
          }
        });
        this.dataService.isLoading = false;
      });
  }

  previewProduct(id: string) {
    this.apiService.getOneProducts(id).subscribe((res: any) => {
      if (this.productItem) {
        this.productItem = res.data;
        this.selectedImage = this.productItem.images[0].url;
        this.router.navigate([`/ecommerce/shop/${id}`]);
      }
    });
  }
}
