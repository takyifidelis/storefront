import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { HomeEcommerceComponent } from './home-ecommerce/home-ecommerce.component';
import { ReviewComponent } from './review/review.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AboutUsComponent } from './about-us/about-us.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../Services/data.service';
import {MatBadgeModule} from '@angular/material/badge';


import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { APIService } from '../../../../Services/api.service';
import { FormsModule } from '@angular/forms';
import { FilterProductPipe } from '../../../../Pipes/filter-product.pipe';

@Component({
  selector: 'app-ecommerce-website',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    HomeEcommerceComponent,
    ReviewComponent,
    RouterModule,
    MatProgressBarModule,
    MatCardModule,
    MatButtonModule,
    AboutUsComponent,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatBadgeModule,
    DragDropModule,
    FormsModule,
    FilterProductPipe,
    CdkDropList, CdkDrag
  ],
  templateUrl: './ecommerce-website.component.html',
  styleUrl: './ecommerce-website.component.scss',
})
export class EcommerceWebsiteComponent implements OnInit{
  heartIcon = faHeart;
  shoppingCartIcon = faShoppingCart;
  searchIcon = faSearch;
  serverResponseReceived = false
  dropDownMenu: HTMLElement | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(public dataService: DataService, private apiService:APIService, private router:Router) {
    if(dataService.isInEditMode) {
      
      // console.log(dataService.template)
    }
  }

  goToCheckout(){
    // console.log(this.dataService.cart)
    // console.log(JSON.parse(localStorage.getItem('cart')!))
    this.router.navigate(['/checkout-page']);
  }
  toggleBtnFunction() {
    this.dropDownMenu = document.querySelector('#dropdownMenu');
    if (this.dropDownMenu) {
      this.dropDownMenu.classList.toggle('open');
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  drop(event: CdkDragDrop<string[]>) {
   if (this.dataService.isEditable) {
    moveItemInArray(this.dataService.template.pagesOrder, event.previousIndex, event.currentIndex);
   }
  }
  ngOnInit(): void {

    
  if (!this.dataService.isInEditMode) {
  //     this.apiService.getStore().subscribe((data:{[key: string]: any;} )=>{
  //       this.dataService.isLoading =false
  //       console.log(data)
  //       if (data['data']) {
  //         localStorage.setItem('storeId',data['data'][2].id)
  //         localStorage.setItem('template',data['data'][2].template.options)
  //         this.serverResponseReceived = true
  //           this.dataService.template = JSON.parse(localStorage.getItem('template')!)
  //       } else {
  //         this.router.navigate(['']);
  //       }
  //     // })
  //     })
  // } else {
  //   this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe((data:any) => {
  //     console.log(data)
  //     if (data.data) {
  //       localStorage.setItem('storeId',data.data[0].id)
  //       localStorage.setItem('tempTemplate',data.data[0].template.temp.options)
  //       localStorage.setItem('template',data.data[0].template.options)
  //       this.serverResponseReceived = true
  //       this.dataService.template = JSON.parse(localStorage.getItem('tempTemplate')!)
  //       this.dataService.isLoading =false
  //     } else {
  //       this.router.navigate(['']);
  //       this.dataService.isLoading =false
  //     }
  //   })
  }

   
    // console.log(this.dataService.template)
  }
}
