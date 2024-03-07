import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit{
walletForm!: FormGroup;

constructor(public http: HttpClient){}

  ngOnInit(): void {
    this.walletForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'method': new FormControl(null, Validators.required),
      'walletId': new FormControl(null, Validators.required),
    })
  }

  onSubmit(){
    console.log(this.walletForm);
    this.http
      .post<Response>(
        `${environment.baseApiUrl}/store/add-wallet/f9586428-62e3-4455-bb1d-61262a407d1a`,
        this.walletForm.value,
        {
          withCredentials: true,
        }
      )
      .subscribe((res: any) => {
        console.log(res);
      });
  }
}
