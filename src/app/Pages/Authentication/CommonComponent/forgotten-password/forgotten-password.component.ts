import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailNotificationComponent } from './email-notification/email-notification.component';
import { TokenAuthComponent } from '../token-auth/token-auth.component';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FontAwesomeModule, EmailNotificationComponent, TokenAuthComponent],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {

}
