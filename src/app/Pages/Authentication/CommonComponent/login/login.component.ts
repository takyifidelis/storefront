declare var google: any;

import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
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
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    GoogleSigninButtonModule,
    SocialLoginModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  user: SocialUser | undefined;
  isLoggedIn: boolean | undefined;
  passwordLock = faLock;
  mailIcon = faEnvelope;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  eyeIcon = faEyeSlash;
  
@ViewChild('search')search!: ElementRef;

  constructor(private authService: SocialAuthService, @Inject(DOCUMENT) private document: Document) {}
  
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
console.log(user)
      this.user = user;
      this.isLoggedIn = user != null;
    });

  }

  // onGoogle() {
    // this.document.getElementsByName('asl-google-signin-button')
    // console.log(  this.document.getElementsByTagName('asl-google-signin-button')
    // )
  }

