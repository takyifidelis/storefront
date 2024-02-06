import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  passwordLock = faLock;
  mailIcon = faEnvelope;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  eyeIcon = faEyeSlash;
}
