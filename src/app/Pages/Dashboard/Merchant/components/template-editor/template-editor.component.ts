import { Component } from '@angular/core';
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
  addFilesUrl=`<svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 28 30" fill="none">
  <path d="M1 24.2534H5.10354M9.20707 24.2534H5.10354M5.10354 24.2534V20.1498M5.10354 24.2534V28.3569M7.85017 1H20.8447L27 7.1553V24.2534" stroke="#0085FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.3213 28.3569H20.8444C21.3886 28.3569 21.9105 28.1407 22.2953 27.7559C22.68 27.3712 22.8962 26.8493 22.8962 26.3051V10.2316C22.8963 10.1236 22.8751 10.0167 22.8338 9.91692C22.7925 9.81716 22.7319 9.72654 22.6555 9.65024L18.3495 5.34426C18.273 5.2677 18.1822 5.20702 18.0822 5.1657C17.9822 5.12439 17.875 5.10325 17.7668 5.10352H4.43031C3.88615 5.10352 3.36427 5.31969 2.97949 5.70447C2.59471 6.08925 2.37854 6.61112 2.37854 7.15529V16.0463" stroke="#0085FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.4248 5.10352V9.75419C17.4248 9.97185 17.5113 10.1806 17.6652 10.3345C17.8191 10.4884 18.0278 10.5749 18.2455 10.5749H22.8962" stroke="#0085FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}