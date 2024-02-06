import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup-merchant',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupMerchantComponent {
  mailIcon = faEnvelope;
  eyeIcon = faEyeSlash;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  ol = faCircle;
}
