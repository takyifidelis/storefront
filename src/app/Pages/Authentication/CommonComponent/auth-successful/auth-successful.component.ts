import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-successful',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-successful.component.html',
  styleUrl: './auth-successful.component.scss',
})
export class AuthSuccessfulComponent {}
