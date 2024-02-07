import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { TokenAuthComponent } from '../token-auth/token-auth.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    EmailNotificationComponent, 
    TokenAuthComponent,
    FormsModule
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {
email={
  value:'',
  isValid: false
}
  validateEmail(){
    this.email.isValid =/[\w]+@[a-z]+.[a-z]{2,}.[a-z]{2,}/.test(this.email.value.toLocaleLowerCase())
  }

  requestPasswordReset(){
    
  }
}
