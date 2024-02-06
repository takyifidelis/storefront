import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-reset-passowrd',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './reset-passowrd.component.html',
  styleUrl: './reset-passowrd.component.scss'
})
export class ResetPassowrdComponent {
eyeIcon = faEyeSlash;

}
