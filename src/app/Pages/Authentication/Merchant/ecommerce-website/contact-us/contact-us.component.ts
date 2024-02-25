import { Component } from '@angular/core';
import { DataService } from '../../../../../Services/data.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  constructor(public dataService: DataService){}

  // inline editor function to capture inputs
  
  // onInput(event: Event): void {
  //   const editorContent = (event.target as HTMLElement).innerText;
  //   console.log('Editor Content:', editorContent);
  // }
}
