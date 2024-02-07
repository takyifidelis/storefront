import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-passowrd',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule, RouterModule],
  templateUrl: './reset-passowrd.component.html',
  styleUrl: './reset-passowrd.component.scss',
})
export class ResetPassowrdComponent {
  eyeIcon = faEyeSlash;
  ol = faCircle;

  password:string ='';
  confirmPassword:string ='';
  isValid:boolean = false;
  isMinTenChar:boolean = false;
  isMinOneNum:boolean = false;
  isMinOneUppercase:boolean = false;
  isMinOneLowercase:boolean = false;

  validatePassword(){
    this.isMinTenChar = /[\w]{10,}/.test(this.password)
    this.isMinOneNum = /[\d]/.test(this.password)
    this.isMinOneUppercase = /[A-Z]/.test(this.password)
    this.isMinOneLowercase = /[a-z]/.test(this.password)
    if (this.isMinTenChar && this.isMinOneLowercase&& this.isMinOneNum && this.isMinOneUppercase) {
      if (this.password === this.confirmPassword) {
        this.isValid = true;
      }
    }
  }
}
