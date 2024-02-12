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
  constructor(private elementRef: ElementRef<HTMLElement>){
    elementRef.nativeElement.addEventListener("dblclick", (event) =>{
      let target = event.target as HTMLElement
      (event.target as HTMLElement).contentEditable = 'true'
      console.log(target.classList)
    })
      }
  }