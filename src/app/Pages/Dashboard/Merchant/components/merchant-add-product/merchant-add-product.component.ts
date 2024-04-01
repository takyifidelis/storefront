import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Authentication/Auth/auth.service';

import { APIService } from '../../../../../Services/api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DataService } from '../../../../../Services/data.service';
import { merchantProduct } from '../../../../../interfaces/all-interfaces';

@Component({
  selector: 'app-merchant-add-product',
  standalone: true,
  imports: [
    CKEditorModule,
    MatRadioModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './merchant-add-product.component.html',
  styleUrl: './merchant-add-product.component.scss',
})
export class MerchantAddProductComponent {
  public Editor = ClassicEditor;
  isLoading: boolean = false;
  public productDetailss: any = {
    description: '', 
  };
  images: string[] = [];
  productForm: FormGroup;
  inputText: string = '';
  inputSize: string = '';
  inputColor: string = '';
  sizeArray: string[] = [];
  colorArray: string[] = [];
  variationKey: string = '';
  variationValue: string = '';
  variationArray: { type: string, value: string }[] = [];
  DisplayedVariationArray: any= [];
  selectedStatus = {displayValue:'Active', value:true};
  displayedStatus: string = 'Active';

  files: any;
  data = new FormData();
  categories: string[] = [];
  productDetails = {
    name: '',
    price: 0,
    quantity: 0,
    description: this.productDetailss.description,
    isActive: true,
    category: '',
  };
  onFileSelected(event: any) {
    for (const file of event.target.files) {
      this.data.append('images', file);
    }
    const files: FileList = event.target.files;
    if (files) {
      const remainingSlots = 4 - this.images.length;
      const filesToAdd = Math.min(files.length, remainingSlots);
      for (let i = 0; i < filesToAdd; i++) {
        const file = files.item(i);
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  showDragAndDrop(): boolean {
    return this.images.length < 4;
  }

  constructor(
    private authService: APIService,
    private router: Router,
    private apiService: APIService,
    private toastr: ToastrService,
    public dataService:DataService
  ) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required),
      productStock: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      category: new FormControl(''),
      productImages: new FormControl(''),
    });
  }

  onSubmit() {
    this.data.append('name', this.productDetails.name);
    this.data.append('price', this.productDetails.price.toString());
    this.data.append('quantity', this.productDetails.quantity.toString());
    this.data.append('description', this.productDetailss.description);
    this.data.append('isActive', this.productDetails.isActive.toString());
    this.data.append('category', this.productDetails.category);
    this.data.append('variations', JSON.stringify(this.variationArray));
    this.isLoading = true;

    this.authService
      .postProduct(this.data, localStorage.getItem('storeId')!)
      .subscribe(
        (resData) => {
          this.productDetails = {
            name: '',
            price: 0,
            quantity: 0,
            description: '',
            isActive: true,
            category: '',
          };

          this.router.navigate(['/merchant/product']);
          this.toastr.info(resData.message, 'Success');
          this.isLoading = false;
        },
        (errorMessage) => {
          this.isLoading = false;

          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );


  }

  onUpdate() {
    this.productDetails.description = this.productDetailss.description
   this.data.forEach((item)=>{
    });
    this.isLoading = true;
    if (this.isMerchantProductInterface(this.dataService.updateProduct)) {
      this.authService
        .updateProduct(this.productDetails, this.dataService.updateProduct.id)
        .subscribe(
          (resData) => {
            this.router.navigate(['/merchant/product']);
            this.toastr.info(resData.message, 'Success');
            this.isLoading = false;
            this.resetProductForm()
          },
          (errorMessage) => {
            this.isLoading = false;
  
            this.toastr.error(
              errorMessage.error.message,
              errorMessage.error.type
            );
          }
        );
    }

      
  }
  resetProductForm() {
    this.productDetails = {
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      isActive: true,
      category: '',
    };
  }
  addCategory() {
    this.apiService
      .AddStoreCategories(localStorage.getItem('storeId')!, {
        names: [`${this.inputText}`],
      })
      .subscribe((data) => {
        this.categories.push(this.inputText);
        this.inputText = '';
        this.toastr.info(data.message, data.type);
      });
  }
  addVariation(key:string, value:string) {
    this.variationArray.push({
      type: key,
      value: value,
    });
    this.DisplayedVariationArray = Object.entries(
      this.variationArray.reduce((acc:any, obj:any) => {
        if (!acc[obj.type]) {
          acc[obj.type] = [];
        }
        acc[obj.type].push(obj.value);
        return acc;
      }, {})
    ).map(([type, values]) => ({
      type,
      values: values,
    }))
    this.variationValue =''
    // this.variationKey =''
  }

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus.displayValue = target.value;

    this.displayedStatus =
      this.selectedStatus.value === true ? 'Active' : 'Not Active';
    this.productDetails.isActive = target.value === 'true' ? true : false;
  }
isMerchantProductInterface(obj: any): obj is merchantProduct {
    return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}
  ngOnInit() {
    if (this.isMerchantProductInterface(this.dataService.updateProduct)) {
      this.dataService.isProductUpdateInstance = true;
      this.DisplayedVariationArray = this.dataService.updateProduct.variations
      this.productDetails.name = this.dataService.updateProduct.name;
      this.productDetails.price = (this.dataService.updateProduct.price);
      this.productDetails.quantity = this.dataService.updateProduct.quantity;
      this.productDetailss.description = this.dataService.updateProduct.description;
      this.selectedStatus.value = (this.dataService.updateProduct.isActive);
      this.categories.push(this.dataService.updateProduct.category)
      this.productDetails.category = this.dataService.updateProduct.category
      this.variationArray = this.dataService.updateProduct.variations;
      this.dataService.updateProduct.images.forEach((image) => {
        this.images.push(image.url);
      })
    }else{
      this.dataService.isProductUpdateInstance = false;
      this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        for (const cat of catResData['data']) {
          this.categories.push(cat.name);
        }
      });
    }
  }
  ngOnDestroy() {
    this.dataService.isProductUpdateInstance = false;
    this.dataService.updateProduct = ''
  }
}
