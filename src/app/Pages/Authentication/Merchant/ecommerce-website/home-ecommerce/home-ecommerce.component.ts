import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
import { Router, RouterModule } from '@angular/router';
import {
  ProductObject,
  Response as resp,
} from '../../../../../interfaces/all-interfaces';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';
import { FilterOnePipe } from '../../../../../Pipes/filter-one.pipe';
import { FilterProductPipe } from '../../../../../Pipes/filter-product.pipe';

interface Item {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    FilterOnePipe,
    FilterProductPipe,
    StarRatingComponent,
    RouterModule,
  ],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent implements OnInit {
  imageUrl: any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  isliked: boolean = false;
  like: any = [];
  // e: any;
  cart: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dataservice: DataService,
    private apiService: APIService,
    private router: Router
  ) {}

  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
    // this.dataservice.inputLinkVisibility[index] = true;
  }

  showLink() {
    this.dataservice.showInputLink = !this.dataservice.showInputLink;
  }

  onSelectFile(event: any, target: string) {
    const file: File = event.target.files[0]; // Get the selected file
    //     if (file) {
    //  }

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        switch (target) {
          case 'hero':
            this.dataservice.template.templateImages.heroImage =
              e.target.result;
            break;

          case 'tSection':
            this.dataservice.template.sectionTwo.twoSection.image =
              e.target.result;
            break;

          case 'twoSection':
            console.log(e.target.result);
            this.dataservice.template.sectionTwo.twoSection.image =
              e.target.result;
            break;

          default:
            break;
        }
      };
    }
  }
  goToProduct(id: string) {
    this.apiService.getOneProducts(id).subscribe((res: any) => {
      if (res.data) {
        let resJson = JSON.stringify(res.data);
        localStorage.setItem('selectedProduct', resJson);
        this.dataservice.product = res.data;
        console.log(this.dataservice.product);
        this.router.navigate([`/ecommerce/shop/${id}`]);
      }
    });
  }

  //   addToCart(product:any){
  //     // this.cart.push(product);
  //     // console.log(this.cart);
  //     if (localStorage.getItem('cart')) {
  //       if (JSON.parse(localStorage.getItem('cart')!)) {
  //         this.cart = JSON.parse(localStorage.getItem('cart')!);
  //         this.cart.push(product);
  //         this.dataservice.cart = this.cart
  //         localStorage.setItem('cart', JSON.stringify(this.cart));
  //       }
  //       else{
  //         localStorage.setItem('cart', JSON.stringify('[]'));
  //         this.cart = JSON.parse(localStorage.getItem('cart')!);
  //         console.log(this.cart);
  //         this.cart.push(product);
  //         this.dataservice.cart = this.cart
  //         localStorage.setItem('cart', JSON.stringify(this.cart));
  //       }
  //     }
  //     else {
  //       this.cart.push(product);
  //       this.dataservice.cart = this.cart
  //       localStorage.setItem('cart', JSON.stringify(this.cart));
  //     }
  //   }
  removeDuplicates(items: Item[]): Item[] {
    // Create a Map to store unique names as keys
    const uniqueNames = new Map<string, boolean>();

    // Filter out duplicate items based on the 'name' property
    const uniqueItems = items.filter((item) => {
      if (!uniqueNames.has(item.name)) {
        uniqueNames.set(item.name, true);
        return true;
      }
      return false;
    });

    return uniqueItems;
  }

  ngOnInit() {
    // this.apiService.getStore(this.dataservice.businessId).subscribe((storeResData:any) =>{
    // this.apiService.getStore(this.dataservice.storeId).subscribe((storeResData:any) =>{
    // console.log({storeId: storeResData});
    this.apiService
      .getCustomerStoreProducts(localStorage.getItem('storeId')!)
      .subscribe((productResData: any) => {
        console.log(productResData);
        this.dataservice.products = productResData.data;
        // this.apiService.getStoreCategories(this.dataservice.storeId).subscribe((storeCatsData:any)=>{
        // this.dataservice.productCategories = storeCatsData.data
        // console.log(this.dataservice.productCategories)
        // });
        if (JSON.parse(localStorage.getItem('cart')!)) {
          this.cart = JSON.parse(localStorage.getItem('cart')!);
          this.dataservice.cart = this.cart;
        }
      });
    // })
  }

  liked(product: any) {
    product.isliked = !product.isliked;
    // let like = JSON.parse(localStorage.getItem('favouriteProducts')|| '')
    this.like.push(product);
    let likedProductsJson = JSON.stringify(this.like);
    localStorage.setItem('favouriteProducts', likedProductsJson);
    let productObj: ProductObject = {
      products: [],
    };
    for (const likeditem of this.like) {
      productObj.products.push(likeditem.id);
    }
    this.apiService.addToFavourite(productObj).subscribe((res) => {
      console.log(res);
    });
  }

  addToCart(product: any) {
    // let cart = JSON.parse(localStorage.getItem('cart')|| '')
    this.cart.push(product);
    let addTobuyJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', addTobuyJson);
    let productObj: ProductObject = {
      products: [],
    };
    for (const likeditem of this.cart) {
      productObj.products.push(likeditem.id);
    }
    this.apiService.addTOViews(productObj).subscribe((res) => {
      console.log(res);
    });
  }
}
