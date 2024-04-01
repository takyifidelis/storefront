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
  oneProduct,
  Response as resp,
} from '../../../../../interfaces/all-interfaces';
import { StarRatingComponent } from '../../../../Dashboard/Customer/components/star-rating/star-rating.component';
import { FilterOnePipe } from '../../../../../Pipes/filter-one.pipe';
import { FilterProductPipe } from '../../../../../Pipes/filter-product.pipe';
import { MatDialog } from '@angular/material/dialog';
import { TemplateTextEditorDialogComponent } from '../../../../Dashboard/Merchant/components/template-text-editor-dialog/template-text-editor-dialog.component';
import { productInterface } from '../../../../Dashboard/Merchant/components/merchant-discount/merchant-discount.component';

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
  cart: any = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public dataservice: DataService,
    private apiService: APIService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  showLink() {
    this.dataservice.showInputLink = !this.dataservice.showInputLink;
  }

  onSelectFile(event: any, target: string) {
    const file: File = event.target.files[0]; 
   

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
            this.dataservice.template.sectionTwo.twoSection.image =
              e.target.result;
            break;

          default:
            break;
        }
      };
    }
  }
  goToProduct(product:oneProduct){
    localStorage.setItem('productId', product.id)
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    this.router.navigate([`/ecommerce/shop/${product.id}`]);
    
  }
  editText(...args: string[]) {
    if(this.dataservice.isEditingTemp){
      this.dialog.open(TemplateTextEditorDialogComponent, {
        data: args,
        hasBackdrop: false
      }).afterClosed().subscribe((editedtText) => {
        args.shift()
        this.dataservice.updateText(editedtText, ...args);
      });
    }
  }

  removeDuplicates(items: Item[]): Item[] {
    const uniqueNames = new Map<string, boolean>();
    const uniqueItems = items.filter((item) => {
      if (!uniqueNames.has(item.name)) {
        uniqueNames.set(item.name, true);
        return true;
      }
      return false;
    });

    return uniqueItems;
  }


  ngOnInit(){
      this.apiService.getCustomerStoreProducts(localStorage.getItem('storeId')!).subscribe((productResData)=>{
        this.dataservice.products = productResData.data
        let categories:string[] = []
        this.dataservice.products.forEach((product:oneProduct)=>{
          categories.push(product.category)
        })
        categories = [...new Set(categories)]
        this.dataservice.productCategories = categories
        if (JSON.parse(localStorage.getItem('cart')!)) {
          this.cart = JSON.parse(localStorage.getItem('cart')!);
          this.dataservice.cart = this.cart;
        }
        if(JSON.parse(localStorage.getItem('favouriteProducts')!)){
          this.dataservice.like = this.like;
        }
      })

  }

  liked(product: any) {
    product.isliked = !product.isliked;
    product.quant = 1;
    this.dataservice.like.push(product);
    let likedProductsJson = JSON.stringify(this.dataservice.like);
    localStorage.setItem('favouriteProducts', likedProductsJson);
    let productObj: ProductObject = {
      products: [],
    };
    for (const likeditem of this.like) {
      productObj.products.push(likeditem.id);
    }
    for (const likeditem of this.dataservice.like){
      productObj.products.push(likeditem.id)
    }
    this.apiService.addToFavourite(productObj, localStorage.getItem('customerId')!).subscribe((res)=>{
      })
  }

  addToCart(product: any) {
    product.quant = 1;
    this.dataservice.cart.push(product);
    let addTobuyJson = JSON.stringify(this.dataservice.cart);
    localStorage.setItem('cart', addTobuyJson);
    let productObj: ProductObject = {
      products: []
    }
    for (const item of this.dataservice.cart){
      productObj.products.push(item.id)
    }
    this.apiService.addTOViews(productObj, localStorage.getItem('customerId')!).subscribe((res)=>{
      })

  }

}
