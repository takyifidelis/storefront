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
import { ProductObject, Response as resp } from '../../../../../interfaces/all-interfaces';
import { Router, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';

interface Item {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule, CommonModule, StarRatingComponent],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent implements OnInit {
  imageUrl: any = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  isliked: boolean = false;
// e: any;

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
    this.apiService
      .getStore('f739a921-7267-4e02-8222-ceb2b4c352cf')
      .subscribe((storeResData: any) => {
        console.log({ storeId: storeResData });
        // this.dataservice.storeId = storeResData.data[0].id
        this.dataservice.storeId = 'f9586428-62e3-4455-bb1d-61262a407d1a';
        console.log(this.dataservice.storeId);
        this.apiService
          .getStoreProductsCustomer(this.dataservice.storeId)
          .subscribe((productResData: any) => {
            // this.dataservice.products = productResData.data
            this.dataservice.products = productResData.data;
            console.log(productResData.data);
            // for (const product of this.dataservice.products) {

            // this.dataservice.productCategory.push({name: product.category, image:""})
            // }
            this.dataservice.productCategory = this.removeDuplicates(
              this.dataservice.productCategory
            );
            // console.log(this.dataservice.productCategory)
          });
      });
  }

  liked(product: any) {
    product.isliked = !product.isliked;
    let like = JSON.parse(localStorage.getItem('favouriteProducts')|| '')
    like.push(product);
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

  addToCart(product: any) {
    let cart = JSON.parse(localStorage.getItem('cart')|| '')
    cart.push(product);
    let addTobuyJson = JSON.stringify(cart);
    localStorage.setItem('cart', addTobuyJson);
    let productObj: ProductObject = {
      products: []
    }
    for (const likeditem of cart){
      productObj.products.push(likeditem.id)
    }
    this.apiService.addTOViews(productObj).subscribe((res)=>{
        console.log(res);
      })

  }
}
