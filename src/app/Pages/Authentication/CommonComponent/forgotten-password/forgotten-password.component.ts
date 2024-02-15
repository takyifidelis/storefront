import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenAuthComponent } from '../token-auth/token-auth.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    TokenAuthComponent,
    FormsModule,
    RouterModule
  ],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss'
})
export class ForgottenPasswordComponent {
email={
  value:'',
  isValid: false
}
constructor(private router: Router){}
  validateEmail(){
    this.email.isValid =/[\w]+@[a-z]+\.[a-z]{2,}/.test(this.email.value.toLocaleLowerCase())
  }

  requestPasswordReset(){
    this.router.navigate(['/reset-password'])
  }
}
