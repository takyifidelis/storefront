import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { APIService } from '../../../../../Services/api.service';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import introJs from 'intro.js';


@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,
    RouterModule,CommonModule,FormsModule,MatFormFieldModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatSliderModule,MatCheckboxModule,
    MatIconModule, MatSidenavModule,MatMenuModule, MatTooltipModule,CommonModule ,
    MatProgressSpinnerModule
  ],
  templateUrl: './template-editor.component.html',
  styleUrl: './template-editor.component.scss'
})
export class TemplateEditorComponent  implements AfterViewInit,OnInit{
  screenWidth:number = 800
  dropDownMenu: HTMLElement | null = null;
  isTemplateVisible: boolean = false;
  isColorVisible: boolean = false;
  isShapesVisible: boolean = false;
  isPagesVisible:boolean = false;
  constructor(private elementRef: ElementRef<HTMLElement>, public dataservice: DataService, private apiService: APIService){ }
  @HostListener ('window:keydown.control.b', ['$event']) makeEditableUi(){
    this.dataservice.isEditable  = !this.dataservice.isEditable
    if (this.dataservice.isEditable) {
      document.querySelectorAll('button').forEach((btn)=>{
        btn.addEventListener('click', ()=>{
          // btn.dataset['element']
          console.log(btn.dataset['element'])
          document.execCommand(`${btn.dataset['element']}`,false, 'null')
        })
      });
      this.elementRef.nativeElement.addEventListener("click", (event) =>{
        let target = event.target as HTMLElement
        if (target.hasAttribute('contenteditable')) {
            target.querySelector('.editor_controls')?.setAttribute('style','display:block')
        } else {
            
            target.querySelector('.editor_controls')?.setAttribute('style','display:block')
        }
        });
      this.elementRef.nativeElement.addEventListener("mouseover", (event) =>{
        let target = event.target as HTMLElement
        // console.log(this.elementRef.nativeElement.getElementsByTagName('app-ecommerce-website'));
        if (target.childNodes.length > 0 && this.containsTextNodes(target)) {
          target.contentEditable = 'true';
          // console.log("Contenteditable attribute added to:", target);
        }
        if (target.getElementsByTagName("img").length) {
          let images = target.getElementsByTagName("img");
          Array.from(images).forEach((image: HTMLElement) => {
            // console.log("Image found:", image);
          });
        }
      })
  
      this.elementRef.nativeElement.addEventListener("mouseover", (event) =>{
      
        this.elementRef.nativeElement.getElementsByTagName('app-ecommerce-website')[0].addEventListener("mouseover",(element)=>{
          let el = element.target as HTMLElement
      
          if (el.getElementsByTagName("img").length) {
            let images = el.getElementsByTagName("img");
            Array.from(images).forEach((image: HTMLElement) => {
              // console.log("Image found:", image);
            });
          }
  
          if (el.childNodes.length > 0 && this.containsTextNodes(el)) {
            el.contentEditable = 'true';
            // console.log("Contenteditable attribute added to:", el);
          }
        })
        
  
      })
    } else{
      this.elementRef.nativeElement.addEventListener("mouseover", (event) =>{
        let target = event.target as HTMLElement
        // console.log(this.elementRef.nativeElement.getElementsByTagName('app-ecommerce-website'));
        if (target.childNodes.length > 0 && this.containsTextNodes(target)) {
          target.contentEditable = 'false';
          console.log("Contenteditable attribute added to:", target);
        }
        
      })
    }
  }

  isMobile(val:string){
    if (val === 'true') {
      this.dataservice.isMobileBool = true;
    } else {
      this.dataservice.isMobileBool = false;
    }
  }

  containsTextNodes(element: HTMLElement): boolean {
    for (let i = 0; i < element.childNodes.length; i++) {
      if (element.childNodes[i].nodeType === Node.TEXT_NODE) {
        return true;
      }
    }
    return false;
  }
  toggleBtnFunction() {
    this.dropDownMenu = document.querySelector('#dropdownMenu');
    if (this.dropDownMenu) {
      this.dropDownMenu.classList.toggle('open');
    }
  }
  showHideDiv(el:string) {
    switch (el) {
      case 'isColorVisible':
        this.isColorVisible = !this.isColorVisible;
        break;
      case 'isTemplateVisible':
        this.isTemplateVisible = !this.isTemplateVisible;
        if (!this.isTemplateVisible) {
          this.isColorVisible = false;
        }
        break;
      case 'isShapesVisible':
        this.isShapesVisible = !this.isShapesVisible;
        break;
      case 'isPagesVisible':
        this.isPagesVisible = !this.isPagesVisible;
        break;
      default:
        break;
    }
  }

  logPages(){
    console.log(this.dataservice.template.pagesOrder)
  }
  saveTemplateDraft(template:any){
    this.dataservice.isLoading =true
    JSON.stringify(template)
    this.apiService.saveTemplateDraft(localStorage.getItem('storeId')!,{options:JSON.stringify(template)}).subscribe((data:any)=>{
      console.log(data);
      if(data.data){
        this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe((storeData:any) => {
          localStorage.setItem('storeId',storeData.data[0].id)
          localStorage.setItem('tempTemplate',storeData.data[0].template.temp.options)
          localStorage.setItem('template',storeData.data[0].template.options)
          this.dataservice.template = JSON.parse(localStorage.getItem('tempTemplate')!)
          this.dataservice.isLoading =false
        })
      }
    })
  }

  publishTemplate(template:any){
    console.log(template);
    this.apiService.publishTemplate(localStorage.getItem('storeId')!,{options:JSON.stringify(template)}).subscribe((data:any)=>{
      this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe((templatesData:any) => {
        console.log(templatesData.data)
      })
      console.log(data);
    })
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.dataservice.isInEditMode = true
    if (!localStorage.getItem('editorTourCompleted')) {
      introJs().setOptions({
        steps: [
          {
            element: '#tourStepZero',
            intro: `<div style="display:flex">Great News! on this page, you can customize your store front</div>`,
          },
          {
            element: '#tourStepOne',
            intro: `<div style="">Click here at anytime to return to your <strong style="color:blue;">Dashboard</strong> <hr> Note:<small> <i style="color:red">save your work before you exit this page<i/></small></div>`,
          },
          {
            element: '#tourStepTwo',
            intro: `<div style="">
              This button gives you a preview on how your<strong style="color:blue;">desktop view</strong> of the store 
              </div>`
          },
          {
            element: '#tourStepThree',
            intro: `<div style="">
              Clicking here will take you to the <strong style="color:blue">PRODUCT</strong> page, where you  can add new products to your store
              </div>`
          },
          {
            element: '#tourStepFour',
            intro: `<div style="">
            This leads to a pages where you can add or modify <strong style="color:blue">DISCOUNT</strong> to products on your store
              </div>`
          },
          {
            element: '#tourStepFive',
            intro: `<div style="">
              Clicking here will take you to the <strong style="color:blue">REVIEW</strong> page, where you  can manage your customer reviews and reply to them
              </div>`
          },
          {
            element: '#tourStepSix',
            intro: `<div style="">
            Clicking here will take you to the <strong style="color:blue">STORE ORDER</strong> page, where you  can see all of your orders that customers have made on the selected store
              </div>`
          },
          {
            element: '#tourStepSeven',
            intro: `<div style="">
            Click here to go to the <strong style="color:blue">CUSTOMERS'</strong> page, where you  see and manage your customers' information
              </div>`
          },
          {
            element: '#tourStepEight',
            intro: `<div style="">
            Click here to see all <strong style="color:blue">PAYMENTS</strong> recieved from your customers
              </div>`
          },
          {
            element: '#tourStepNine',
            intro: `<div style="">
              To sign out, click on this dropdown menu and continue to logout
              </div>`
          },
        ]
      }).onbeforeexit(function () {
        localStorage.setItem('editorTourCompleted', 'true');
        return confirm("Are You sure you want to exit?");
      }).start();
      }
  }
}