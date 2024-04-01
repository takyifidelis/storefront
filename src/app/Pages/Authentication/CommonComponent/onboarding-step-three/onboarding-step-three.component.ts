import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { APIService } from '../../../../Services/api.service';

@Component({
  selector: 'app-onboarding-step-three',
  standalone: true,
  imports: [RouterModule, MatProgressBarModule, MatCardModule, MatButtonModule,
    MatIconModule,MatProgressSpinnerModule],
  templateUrl: './onboarding-step-three.component.html',
  styleUrl: './onboarding-step-three.component.scss'
})
export class OnboardingStepThreeComponent implements OnDestroy {
  constructor(public dataService: DataService, private apiService: APIService, private router:Router){}
  
  createStore(){
    this.dataService.isLoading =true
    let payload ={
      storeType: localStorage.getItem('storeType'),
      storeName: localStorage.getItem('storeName'),
      template: {
        id: "template 1a",
        options: JSON.stringify(this.dataService.template1),
        temp: JSON.stringify(this.dataService.template1)
      }
    }
    
    this.apiService.setBusinessType(localStorage.getItem('businessId')!,{businessType:localStorage.getItem('storeType')}).subscribe(data =>{
      this.apiService.createStore(localStorage.getItem('businessId')!,payload).subscribe(data =>{
        this.dataService.isLoading =false
        this.router.navigate(['/merchant'])
      }),(errorMessage: any) => {
      }
    }),(errorMessage: any) => {
    }
    
  }
  ngOnDestroy(){
    this.dataService.isLoading = false;
  }
}
