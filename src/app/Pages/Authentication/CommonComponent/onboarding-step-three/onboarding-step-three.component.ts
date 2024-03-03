import { Component } from '@angular/core';
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
export class OnboardingStepThreeComponent {
  constructor(public dataService: DataService, private apiService: APIService, private router:Router){}
  selectStore(storeName:string){
    localStorage.setItem('storeName',storeName)
   
  }
  createStore(){
    this.dataService.isLoading =true
    let payload ={
      storeType: this.dataService.merchantBusinessType1,
      storeName: this.dataService.merchantStoreName,
      template: {
        id: "template 1a",
        options: JSON.stringify(this.dataService.template),
        temp: JSON.stringify(this.dataService.template)
      }
    }
    
    console.log(payload);
    this.apiService.createStore(this.dataService.businessId,payload).subscribe(data =>{
      console.log(data);
      this.dataService.isLoading =false
      this.router.navigate(['/merchant'])
    }),(errorMessage: any) => {
      console.log(errorMessage);
    }
  }
}
