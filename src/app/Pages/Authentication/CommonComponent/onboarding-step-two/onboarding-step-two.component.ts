import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onboarding-step-two',
  standalone: true,
  imports: [RouterModule,MatInputModule,
    MatProgressBarModule, MatCardModule, 
    MatButtonModule, MatIconModule],
  templateUrl: './onboarding-step-two.component.html',
  styleUrl: './onboarding-step-two.component.scss'
})
export class OnboardingStepTwoComponent {
  types:string[]=[
    'Online Store',
    'Blog',
    'Restaurant',
    'Technology company',
    'Portfolio',
    'Weddings',
    'Photography',
    'Professional Services',
    'Online Store',
    'Blog',
    'Restaurant',
    'Technology company',
    'Portfolio',
    'Weddings',
    'Photography',
    'Professional Services'
  ]

  filterList(event:any){
    ;
console.log(this.types.find(element => this.types.includes(event.target.value)));
  }
}
