import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-customer',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupCustomerComponent {
  mailIcon = faEnvelope;
  passwordLock = faLock;
  eyeIcon = faEyeSlash;
  ol = faCircle;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
}
