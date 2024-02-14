import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-onboarding-step-three',
  standalone: true,
  imports: [RouterModule, MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule],
  templateUrl: './onboarding-step-three.component.html',
  styleUrl: './onboarding-step-three.component.scss'
})
export class OnboardingStepThreeComponent {

}
