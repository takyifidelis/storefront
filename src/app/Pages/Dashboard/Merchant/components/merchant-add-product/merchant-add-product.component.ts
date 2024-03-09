import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
    description: '', // Initial value for the description
  };
  images: string[] = []; // Assuming we don't need topImages and bottomImages arrays separately anymore
  productForm: FormGroup;
  inputText: string = '';
  inputSize: string = '';

  inputColor: string = '';
  // textArray: string[] = [];
  sizeArray: string[] = [];
  colorArray: string[] = [];
  variationKey: string = '';
  variationValue: string = '';
  variationArray: { key: string; values: string[] }[] = [];
  selectedStatus: string = 'Active';
  displayedStatus: string = 'Active';

  files: any;
  data = new FormData();
  categories: string[] = [];
  productDetails = {
    name: '',
    price: '',
    quantity: '',
    description: this.productDetailss.description,
    isActive: 'true',
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
    private toastr: ToastrService
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
    this.data.append('price', this.productDetails.price);
    this.data.append('quantity', this.productDetails.quantity);
    this.data.append('description', this.productDetailss.description);
    this.data.append('isActive', 'true');
    this.data.append('category', this.productDetails.category);
    console.log(this.data);
    this.isLoading = true;

    this.authService
      .postProduct(this.data, localStorage.getItem('storeId')!)
      .subscribe(
        (resData) => {
          console.log(resData);
          this.router.navigate(['/merchant/product']);
          this.toastr.info(resData.message, 'Success');
        },
        (errorMessage) => {
          console.log(errorMessage);

          this.toastr.error(
            errorMessage.error.message,
            errorMessage.error.type
          );
        }
      );

    this.productDetails = {
      name: '',
      price: '',
      quantity: '',
      description: '',
      isActive: 'true',
      category: '',
    };
  }

  resetProductForm() {
    this.productDetails = {
      name: '',
      price: '',
      quantity: '',
      description: '',
      isActive: 'true',
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

        console.log(data);
        this.toastr.info(data.message, data.type);
      });
  }
  addSize() {
    if (this.variationKey && this.variationValue) {
      let existingVariation = this.variationArray.find(
        (variation) => variation.key === this.variationKey
      );
      if (existingVariation) {
        existingVariation.values.push(this.variationValue);
      } else {
        this.variationArray.push({
          key: this.variationKey,
          values: [this.variationValue],
        });
      }
      this.variationKey = '';
      this.variationValue = '';
    }
  }
  addColor() {
    this.colorArray.push(this.inputColor);
    this.inputColor = '';
  }
  addVariation() {}

  onStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedStatus = target.value;

    this.displayedStatus =
      this.selectedStatus === 'true' ? 'Active' : 'Not Active';
    this.productDetails.isActive = this.selectedStatus;
  }
  ngOnInit() {
    this.apiService
      .getStoreCategories(localStorage.getItem('storeId')!)
      .subscribe((catResData: { [key: string]: any }) => {
        console.log(catResData);
        for (const cat of catResData['data']) {
          this.categories.push(cat.name);
        }
        console.log(this.categories);
      });
  }
}
