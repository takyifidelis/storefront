import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
ngOnInit(){
  // this.apiService.getStore(this.dataservice.businessId).subscribe((storeResData:any) =>{
  this.apiService.getStore("61f757fe-17f8-4ad7-a91d-32bda3965702").subscribe((storeResData:any) =>{
    console.log({storeId: storeResData});
    this.dataservice.storeId = storeResData.data[0].id
    this.apiService.getStoreProducts(this.dataservice.storeId).subscribe((productResData:any)=>{
      this.dataservice.products = productResData.data
      for (const product of this.dataservice.products) {
        this.dataservice.productCategory.push({name: product.category, image:""})
      }
      this.dataservice.productCategory = [...this.dataservice.productCategory]
      console.log(this.dataservice.productCategory)
    })
  })
}
}
