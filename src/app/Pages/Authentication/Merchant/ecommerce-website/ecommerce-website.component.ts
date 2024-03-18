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
    this.router.navigate(['/checkout-page']);
  }

  goToFavouriteProducts(){
    this.router.navigate(['/customer/fav-product'])
  }

  goToCustomerDashboard(){
this.router.navigate(['/customer'])
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
   if (this.dataService.isEditingTemp) {
    moveItemInArray(this.dataService.template.pagesOrder, event.previousIndex, event.currentIndex);
   }
  }
  // ngOnInit(): void {   
  //   this.dataService.isLoading = true
  //   console.log('loaded wrongly first')
  // if (localStorage.getItem('isEditorLoading')=== 'false') {
  //   console.log('loaded wrongly')
  //   this.apiService.getSingleStore(localStorage.getItem('storeId')!).subscribe((store:{[key:string]:any})=>{
  //     this.dataService.template =JSON.parse(store['data'].template.options)
  //     this.dataService.isLoading =false
  //   })
  // }
  // else if(localStorage.getItem('isEditorLoading')=== 'true') {
  //   console.log('coming from merchant')
  //   this.dataService.template =JSON.parse(localStorage.getItem('template')!)
  //     this.dataService.isLoading =false
  // }

   
  // }
  ngOnInit(): void {   
    this.dataService.isLoading = true
  if (localStorage.getItem('isInEditMode') === 'false') {
    this.apiService.getSingleStore(localStorage.getItem('storeId')!).subscribe((store:{[key:string]:any})=>{
      this.dataService.template = JSON.parse(store['data'].template.options)
      this.dataService.isLoading = false
      console.log(JSON.parse(store['data'].template.options))
    })
  }
  if(localStorage.getItem('isInEditMode') === 'true') {
    console.log('loading here')
    this.dataService.template =JSON.parse(localStorage.getItem('tempTemplate')!)
    this.dataService.template.text = localStorage.getItem('storeName')
      this.dataService.isLoading =false
  }

   
    // console.log(this.dataService.template)
  }
}
