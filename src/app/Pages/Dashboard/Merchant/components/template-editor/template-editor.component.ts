import { AfterViewInit, Component, ElementRef, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [
    RouterModule,CommonModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule, MatSidenavModule,MatMenuModule, 
  ],
  templateUrl: './template-editor.component.html',
  styleUrl: './template-editor.component.scss'
})
export class TemplateEditorComponent  implements AfterViewInit{
  screenWidth:number = 800
  dropDownMenu: HTMLElement | null = null;
  isTemplateVisible: boolean = false;
  isColorVisible: boolean = false;
  isShapesVisible: boolean = false;
  isPagesVisible:boolean = false;
  isEditable: boolean = false;
  constructor(private elementRef: ElementRef<HTMLElement>, public dataservice: DataService){ }
  @HostListener ('window:keydown.control.b', ['$event']) makeEditableUi(){
    this.isEditable  = !this.isEditable
    if (this.isEditable) {
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
        console.log(this.elementRef.nativeElement.getElementsByTagName('app-ecommerce-website'));
        if (target.childNodes.length > 0 && this.containsTextNodes(target)) {
          target.contentEditable = 'true';
          console.log("Contenteditable attribute added to:", target);
        }
        if (target.getElementsByTagName("img").length) {
          let images = target.getElementsByTagName("img");
          Array.from(images).forEach((image: HTMLElement) => {
            console.log("Image found:", image);
          });
        }
      })
  
      this.elementRef.nativeElement.addEventListener("mouseover", (event) =>{
      
        this.elementRef.nativeElement.getElementsByTagName('app-ecommerce-website')[0].addEventListener("mouseover",(element)=>{
          let el = element.target as HTMLElement
      
          if (el.getElementsByTagName("img").length) {
            let images = el.getElementsByTagName("img");
            Array.from(images).forEach((image: HTMLElement) => {
              console.log("Image found:", image);
            });
          }
  
          if (el.childNodes.length > 0 && this.containsTextNodes(el)) {
            el.contentEditable = 'true';
            console.log("Contenteditable attribute added to:", el);
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
  ngAfterViewInit() {
    // document.querySelectorAll('button').forEach((btn)=>{
    //   btn.addEventListener('click', ()=>{
    //     // btn.dataset['element']
    //     console.log(btn.dataset['element'])
    //     document.execCommand(`${btn.dataset['element']}`,false, 'null')
    //   })
    // });
  }
}