import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../../../../Services/api.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SelectionModel } from '@angular/cdk/collections';
import { dummyUserInterface } from '../../components/merchant-products-dashboad/merchant-products-dashboad.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})

export class WalletComponent implements OnInit{
walletForm!: FormGroup;
walletInfo: any = [];
displayedColumns: string[] = [
  'paymentMethod',
  'name',
  'walletId',
  'date',
];
dataSource: MatTableDataSource<dummyUserInterface>;
selection = new SelectionModel<dummyUserInterface>(true, []);
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
users: dummyUserInterface[] = [];
datepipe: DatePipe = new DatePipe('en-US');
isHomeActive: boolean = false;
isPaymentActive: boolean = false;

constructor(public http: HttpClient, private apiService: APIService, public dialog: MatDialog, private router: Router){
  this.dataSource = new MatTableDataSource(this.users);

}

  ngOnInit(): void {
    this.walletForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'method': new FormControl(null, Validators.required),
      'walletId': new FormControl(null, Validators.required),
    })

    this.apiService.getWallet(localStorage.getItem('storeId')!).subscribe((res: any)=> {
      console.log(res)
      this.walletInfo = res.data;
    this.dataSource = new MatTableDataSource(this.walletInfo);
    })

    this.isHomeActive = true;
  }

  onClick(): void {
    if(this.isHomeActive){
      this.isHomeActive = true;
      this.isPaymentActive = false;
this.router.navigate(['/merchant/home']);
    }
    
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  showSelection(e: any) {
    e.stopPropagation();
    console.log(this.selection.selected);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      console.log(this.selection.selected);
      return;
    }

    this.selection.select(...this.dataSource.data);
    console.log(this.selection.selected);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: dummyUserInterface): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.checkbox + 1
    }`;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
