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
import { ToastrService } from 'ngx-toastr';


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
  constructor(private toastr: ToastrService, private elementRef: ElementRef<HTMLElement>, public dataservice: DataService, private apiService: APIService){ }
  @HostListener ('window:keydown.control.b', ['$event']) makeEditableUi(){
    this.dataservice.isEditable  = !this.dataservice.isEditable
    this.dataservice.isEditingTemp  = !this.dataservice.isEditingTemp
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
  }
  saveTemplateDraft(template:any){
    this.dataservice.isLoading =true
    JSON.stringify(template)
    this.apiService.saveTemplateDraft(localStorage.getItem('storeId')!,{options:JSON.stringify(template)}).subscribe((data:any)=>{
      if(data.data){
        this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe(
          (storeData:any) => {
          this.toastr.info('Template saved successfully', 'Success');
          localStorage.setItem('storeId',storeData.data[0].id)
          localStorage.setItem('tempTemplate',storeData.data[0].template.temp.options)
          localStorage.setItem('template',storeData.data[0].template.options)
          this.dataservice.template = JSON.parse(localStorage.getItem('tempTemplate')!)
          this.dataservice.isLoading =false
        },(error)=>{
          this.toastr.error('Error saving the template', 'Error');
        })
      }
    })
  }

  publishTemplate(template:any){
    this.apiService.publishTemplate(localStorage.getItem('storeId')!,{options:JSON.stringify(template)}).subscribe((data:any)=>{
      this.apiService.getMerchantStores(localStorage.getItem('businessId')!).subscribe((templatesData:any) => {
        this.toastr.info('Template published successfully', 'Success');
      })
    },(error)=>{
      this.toastr.error('Error publishing the template', 'Error');
    })
  }
  ngAfterViewInit() {
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
              This button gives you a preview on how your store looks on<strong style="color:blue;">desktop</strong>
              </div>`
          },
          {
            element: '#tourStepThree',
            intro: `<div style="">
            This button gives you a preview on how your store looks on<strong style="color:blue;">mobile</strong>  
              </div>`
          },
          {
            element: '#tourStepFour',
            intro: `<div style="">
            This menu gives you access to all the <strong style="color:blue">customization tools</strong> to design your store as you see fit 
              </div>`
          },
          {
            element: '#tourStepFive',
            intro: `<div style="">
              this menu gives you access to 
              <p>
                <ul>
                  <li><strong style="color:blue">Change Fonts</strong>
                  <li><strong style="color:blue">Change Colors</strong>
                  <li><strong style="color:blue">Modify Text</strong>
                  <li><strong style="color:blue">style buttons</strong>
                </ul>
              </p>
              </div>`,
              position:'right'
          },
          {
            element: '#tourStepSix',
            intro: `<div style="">
            Clicking here will give you an option to add new pages such as <strong style="color:blue">About Us, and  Contact Us</strong> page, where you  can tell people about your business
              </div>`,
              position:'right'
          },
          {
            element: '#tourStepSeven',
            intro: `<div style="">
            Click here to <strong style="color:blue">Save</strong> your edited store front as draft when you are satisfied.
              </div>`
          },
          {
            element: '#tourStepEight',
            intro: `<div style="">
            Click here to <strong style="color:blue">Publish</strong> your edited store front for you customers to see.
              </div>`
          },
          {
            element: '#tourStepNine',
            intro: `<div style="">
            Enter <strong style="color:blue">'CTRL' + 'b'</strong> to start customizing your store layout.
              </div>`
          },
        ]
      }).onbeforeexit(function () {
        localStorage.setItem('editorTourCompleted', 'true');
        return confirm("Are You sure you want to exit?");
      }).start();
      }
  }
  ngOnInit() {
  }
}