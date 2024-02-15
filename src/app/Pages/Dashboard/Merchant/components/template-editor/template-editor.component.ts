import { Component, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-template-editor',
  standalone: true,
  imports: [
    RouterModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule, MatSidenavModule,MatMenuModule, 
  ],
  templateUrl: './template-editor.component.html',
  styleUrl: './template-editor.component.scss'
})
export class TemplateEditorComponent {
  screenWidth:number = 800
  dropDownMenu: HTMLElement | null = null;
  isTemplateVisible: boolean = false;
  isColorVisible: boolean = false;
  isShapesVisible: boolean = false;
  isPagesVisible:boolean = false;
  constructor(private elementRef: ElementRef<HTMLElement>){
  //   elementRef.nativeElement.addEventListener("click", (event) =>{
  //     let target = event.target as HTMLElement
  //     if (target.hasAttribute('contenteditable')) {
  //         target.querySelector('.editor_controls')?.setAttribute('style','display:block')
  //     } else {
          
  //         target.querySelector('.editor_controls')?.setAttribute('style','display:block')
  //     }
  // });
  //   elementRef.nativeElement.addEventListener("mouseover", (event) =>{
  //     let target = event.target as HTMLElement
  //     console.log(elementRef.nativeElement.getElementsByTagName('app-ecommerce-website'));
  //     if (target.childNodes.length > 0 && this.containsTextNodes(target)) {
  //       target.contentEditable = 'true';
  //       console.log("Contenteditable attribute added to:", target);
  //     }
  //     if (target.getElementsByTagName("img").length) {
  //       let images = target.getElementsByTagName("img");
  //       Array.from(images).forEach((image: HTMLElement) => {
  //         console.log("Image found:", image);
  //       });
  //     }
  //   })




  //   elementRef.nativeElement.addEventListener("mouseover", (event) =>{
    
  //     elementRef.nativeElement.getElementsByTagName('app-ecommerce-website')[0].addEventListener("mouseover",(element)=>{
  //       let el = element.target as HTMLElement
  //       let button = document.createElement('button');
  //       button.textContent = 'Click me';
  //       button.classList.add('overlay-button');

  //       button.style.position = 'absolute';
  //       button.style.top = event.clientY + 'px';
  //       button.style.left = event.clientX + 'px';

  //   // Add the button to the button container
    

    
  //       if (el.getElementsByTagName("img").length) {
  //         let images = el.getElementsByTagName("img");
  //         Array.from(images).forEach((image: HTMLElement) => {
  //           console.log("Image found:", image);
  //           let buttonContainer = elementRef.nativeElement.getElementsByClassName('buttonContainer')[0];
  //           buttonContainer.innerHTML = '';
  //           buttonContainer.appendChild(button);
  //         });
  //       }

  //       if (el.childNodes.length > 0 && this.containsTextNodes(el)) {
  //         el.contentEditable = 'true';
  //         console.log("Contenteditable attribute added to:", el);
  //       }
  //     })
      

  //   })

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
}