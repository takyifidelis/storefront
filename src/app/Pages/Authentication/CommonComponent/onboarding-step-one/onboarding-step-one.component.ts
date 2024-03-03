import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding-step-one',
  standalone: true,
  imports: [RouterModule,
    MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule, MatRadioModule,FormsModule],
  templateUrl: './onboarding-step-one.component.html',
  styleUrl: './onboarding-step-one.component.scss'
})
export class OnboardingStepOneComponent {
  constructor(public dataService: DataService){
    
  }
}
