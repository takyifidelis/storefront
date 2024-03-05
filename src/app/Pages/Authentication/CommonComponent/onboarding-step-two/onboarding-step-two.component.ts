import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../../Services/data.service';
import { FilterOnePipe } from '../../../../Pipes/filter-one.pipe';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../../../Services/api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-onboarding-step-two',
  standalone: true,
  imports: [RouterModule,MatInputModule,
    MatProgressBarModule, MatCardModule, 
    MatButtonModule, MatIconModule,FilterOnePipe,
    FormsModule,MatProgressSpinnerModule, CommonModule
  ],
  templateUrl: './onboarding-step-two.component.html',
  styleUrl: './onboarding-step-two.component.scss'
})
export class OnboardingStepTwoComponent implements OnDestroy {
constructor(public dataService:DataService, private apiService:APIService, private router: Router){}
searchString = ''
selectedValue: any= 'Filter by Region'

onSelect(val: any) {

//   this.selectedValue = val.value
//   console.log(val.innerText)
//   this.dataService.merchantData.store.name = val.innerText

  this.selectedValue = val.innerText
  this.searchString = val.innerText
  console.log(val.innerText)
  localStorage.setItem('storeName',this.selectedValue)
  // this.dataService.merchantData.store.name = val.innerText
}

continueToStep3(){
//   this.apiService.setBusinessType(this.dataService.businessId,{businessType:this.dataService.merchantData.store.name}).subscribe(data =>{
//     console.log(data);
    localStorage.setItem('storeName',this.searchString)
    this.router.navigate(['/merchant-onboarding-3'])
//   })
// }

  // this.dataService.isLoading =true
  // this.apiService.setBusinessType(localStorage.getItem('businessId')!,{businessType:localStorage.getItem('storeType')}).subscribe(data =>{
  //   console.log(data);
  //   this.dataService.isLoading =false
  //   this.router.navigate(['/merchant-onboarding-3'])
  // }),(errorMessage: any) => {
  //   console.log(errorMessage);
  // }
}
ngOnDestroy(){
  this.dataService.isLoading = false;
}
}