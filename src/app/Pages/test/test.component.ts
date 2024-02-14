import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(private elementRef: ElementRef<HTMLElement>){
  elementRef.nativeElement.addEventListener("click", (element)=>{
    elementRef.nativeElement.getElementsByClassName('.navbar')[0].classList.toggle("showInput");
    if(elementRef.nativeElement.getElementsByClassName('.navbar')[0].classList.contains("showInput")){
      elementRef.nativeElement.getElementsByClassName('.search-box .bx-search')[0].classList.replace("bx-search" ,"bx-x");
    }else {
      elementRef.nativeElement.getElementsByClassName('.search-box .bx-search')[0].classList.replace("bx-x" ,"bx-search");
    }
  });
 
  elementRef.nativeElement.querySelector('.navbar .bx-menu')?.addEventListener('click',() =>{
    (document.querySelector(".nav-links") as HTMLElement).style.left = "0";
  })

  elementRef.nativeElement.querySelector('.nav-links .bx-x')?.addEventListener('click',() =>{
    (document.querySelector(".nav-links") as HTMLElement).style.left = "-100%";
  })

 elementRef.nativeElement.querySelector('.htmlcss-arrow')?.addEventListener('click',() =>{
    elementRef.nativeElement.getElementsByClassName('.nav-links')[0].classList.toggle("show1");
  })
  elementRef.nativeElement.querySelector('.more-arrow')?.addEventListener('click',() =>{
    (document.querySelector(".nav-links") as HTMLElement).classList.toggle("show2");
  })
  elementRef.nativeElement.querySelector('.js-arrow')?.addEventListener('click',() =>{
    (document.querySelector(".nav-links") as HTMLElement).classList.toggle("show3");
  })
  }
}
