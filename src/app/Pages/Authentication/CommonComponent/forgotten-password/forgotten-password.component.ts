import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailNotificationComponent } from './email-notification/email-notification.component';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [FontAwesomeModule, EmailNotificationComponent],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {

}
