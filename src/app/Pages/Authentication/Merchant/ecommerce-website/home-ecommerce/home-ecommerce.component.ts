import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
import  {Response as resp} from '../../../../../interfaces/all-interfaces';
import {RouterModule } from '@angular/router';
import { FilterOnePipe } from '../../../../../Pipes/filter-one.pipe';
import { FilterProductPipe } from '../../../../../Pipes/filter-product.pipe';

interface Item {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [RouterModule,MatIconModule, MatButtonModule, CommonModule,FilterOnePipe,FilterProductPipe],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent implements OnInit {


 
  cart:any = []
  imageUrl:any = null
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(private cdr: ChangeDetectorRef, public dataservice:DataService, private apiService: APIService){}
  openFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
    // this.dataservice.inputLinkVisibility[index] = true;
  }

  showLink() {
    this.dataservice.showInputLink = !this.dataservice.showInputLink;
  }
  onSelectFile(event: any, target:string) {
    const file: File = event.target.files[0]; // Get the selected file
//     if (file) {
//  }


    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        switch (target) {
          case 'hero':
            
          this.dataservice.template.templateImages.heroImage = e.target.result;
            break;
        
          case 'tSection':
            this.dataservice.template.sectionTwo.twoSection.image = e.target.result;
            break;

          case 'twoSection':
            console.log( e.target.result)
            this.dataservice.template.sectionTwo.twoSection.image = e.target.result;
            break;
          
            
            default:
            break;
        }
      };
    }
  }
  goToProduct(){

  }
  addToCart(product:any){
    // this.cart.push(product);
    // console.log(this.cart);
    if (localStorage.getItem('cart')) {
      if (JSON.parse(localStorage.getItem('cart')!)) {
        this.cart = JSON.parse(localStorage.getItem('cart')!);
        this.cart.push(product);
        this.dataservice.cart = this.cart
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
      else{
        localStorage.setItem('cart', JSON.stringify('[]'));
        this.cart = JSON.parse(localStorage.getItem('cart')!);
        console.log(this.cart);
        this.cart.push(product);
        this.dataservice.cart = this.cart
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
    else {
      this.cart.push(product);
      this.dataservice.cart = this.cart
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
  removeDuplicates(items: Item[]): Item[] {
    // Create a Map to store unique names as keys
    const uniqueNames = new Map<string, boolean>();

    // Filter out duplicate items based on the 'name' property
    const uniqueItems = items.filter(item => {
        if (!uniqueNames.has(item.name)) {
            uniqueNames.set(item.name, true);
            return true;
        }
        return false;
    });

    return uniqueItems;
}
ngOnInit(){
  // this.apiService.getStore(this.dataservice.businessId).subscribe((storeResData:any) =>{
  // this.apiService.getStore(this.dataservice.storeId).subscribe((storeResData:any) =>{
    // console.log({storeId: storeResData});
    this.apiService.getStoreProducts(this.dataservice.storeId).subscribe((productResData:any)=>{
      // console.log(productResData.data.products);
      this.dataservice.products = productResData.data.products
      this.apiService.getStoreCategories(this.dataservice.storeId).subscribe((storeCatsData:any)=>{
        this.dataservice.productCategories = storeCatsData.data
        console.log(this.dataservice.productCategories)
      });
      
    })
  // })
}
}
