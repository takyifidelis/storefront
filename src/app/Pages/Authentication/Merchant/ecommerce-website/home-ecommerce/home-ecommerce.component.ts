import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { APIService } from '../../../../../Services/api.service';
import  {Response as resp} from '../../../../../interfaces/all-interfaces';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-ecommerce',
  standalone: true,
  imports: [RouterModule,MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './home-ecommerce.component.html',
  styleUrl: './home-ecommerce.component.scss',
})
export class HomeEcommerceComponent implements OnInit {
 storeTemplateData ={
  sectionOne:{
    h1Title: "level up your style with our summer collections",
    btnText: "SHOP NOW"
  },
  sectionTwo:{
    name:"CATEGORIES",
    categories:[
      {image:"assets/images/ecommerce-home-dresses.svg",catText:""},
      {image:"assets/images/ecommerce-home-dresses.svg",catText:""},
      {image:"assets/images/ecommerce-home-dresses.svg",catText:""},
      {image:"assets/images/ecommerce-home-dresses.svg",catText:""},
      {image:"assets/images/ecommerce-home-dresses.svg",catText:""}
    ],
    twoSection:{
      image:"assets/images/ecommerce-home-two-ladies.svg",text:{discount:"UPTO 40% OFF",otherText:"Special offers and great deals"}
    }
  },
  sectionThree:{
    name:"Featured Items",
    products:[
      {id: "string",name: "ACCESSORIES",images: [{id: "string",url: "assets/images/featured-accesories-rings.svg",key: "string"}],description: "string",isActive: true,quantity: 0,reStockLevel: 0,category: "string",price: 39,discount: 0,promotion: "string"},
      // {image:"assets/images/featured-accesories-rings.svg",card:{title:"ACCESSORIES"}},
      // {image:"assets/images/ecommerce-home-dresses.svg",card:{title:"ACCESSORIES"}},
      // {image:"assets/images/ecommerce-home-dresses.svg",card:{title:"ACCESSORIES"}},
      // {image:"assets/images/ecommerce-home-dresses.svg",card:{title:"ACCESSORIES"}},
      // {image:"assets/images/ecommerce-home-dresses.svg",card:{title:"ACCESSORIES"}}
    ],
    twoSection:{
      image:"assets/images/ecommerce-home-two-ladies.svg",text:{discount:"UPTO 40% OFF",otherText:"Special offers and great deals"}
    }
  }

 }
//  products= [
//   {
//       id: "a58c5939-a33e-43df-89d9-86d5c67ef798",
//       name: "Beach Shirt",
//       description: " Fashion Trend,Massage,Breathable,Anti-Slippery,Hard-Wearing,Height Increasing",
//       isActive: true,
//       quantity: 4,
//       reStockLevel: 0,
//       category: "tops",
//       price: 300,
//       discount: 0,
//       promotion: null,
//       deleted: false,
//       createdAt: "2024-02-21T15:39:23.237Z",
//       updatedAt: "2024-02-21T15:39:23.237Z",
//       store: "f9586428-62e3-4455-bb1d-61262a407d1a",
//       variations: [
//           {
//               type: "Muticoloured",
//               values: [
//                   "XL",
//                   "X",
//                   "XS"
//               ]
//           }
//       ],
//       images: [
//           {
//               url: "https://storefront-gh-media.s3.eu-west-1.amazonaws.com/STRFRNTSMES-1708529962775-1.jpg",
//               id: "cb3cfe8f-553c-4c9f-a582-52918d5012bf"
//           }
//       ],
//       reviews: [],
//       promotionProduct: null,
//       rating: 0
//   }
// ]
  @ViewChild('fileInput') fileInput!: ElementRef;
constructor(public dataservice:DataService, private apiService: APIService){}
  openFileInput(fileInput: HTMLInputElement, index: number) {
    fileInput.click();
    this.dataservice.inputLinkVisibility[index] = true;
  }

  showLink() {
    this.dataservice.showInputLink = !this.dataservice.showInputLink;
  }
  onSelectFile(event: any, imageNumber: number) {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        // Use the image number to update the corresponding URL in the `urls` object.
        this.dataservice.urls[imageNumber] = e.target.result;
      };
    }
  }
  goToProduct(){

  }
ngOnInit(){
  // this.apiService.getStore(this.dataservice.businessId).subscribe((res:any) =>{
  //   this.dataservice.storeId = res.data?.['id'];
  //   this.apiService.getStoreProducts(this.dataservice.storeId).subscribe((res:any) =>{
  //     this.dataservice.products = res.data?.['products'];
  //   })
  // })
}
}
