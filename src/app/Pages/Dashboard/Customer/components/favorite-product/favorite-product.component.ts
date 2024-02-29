import {AfterViewInit, Component, ViewChild,Inject, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { APIService } from '../../../../../Services/api.service';
import { CommonModule } from '@angular/common';

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  category: string;
  price: number;
  images: any;
  quantity: number;
}

@Component({
  selector: 'app-favorite-product',
  standalone: true,
  imports: [
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
      CommonModule
    ],
  templateUrl: './favorite-product.component.html',
  styleUrl: './favorite-product.component.scss'
})
export class FavoriteProductComponent implements OnInit{
  displayedColumns: string[] = ['checkbox', 'name', 'store', 'categories','price','bubble'];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  likedProduct: any;
  products: any;

  // creatine a dummy user data source for the table
  users: dummyUserInterface[] = [
    
]
  constructor(public dialog: MatDialog, private apiService: APIService) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    let cartJson = localStorage.getItem('favouriteProducts');
    this.likedProduct =JSON.parse(cartJson!);
    // console.log(this.likedProduct);

     this.apiService.getSavedProducts().subscribe((res: any) => {
      this.products = res.data;
    this.dataSource = new MatTableDataSource(this.products);
    });
  }

  moreVert(e:dummyUserInterface) {
    this.dialog.open(PurchaseDetailComponent, {
      data: e,
        width: '479px', 
        position: {right:'50px', top: '10%'} 
    });
    console.log(e);
  }
  










  // the code below is all for the checkboxes in the table
  isAllSelected() {
    const numSelected = this.selection.selected.length;    
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
showSelection(e:any) {
  e.stopPropagation()
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.checkbox + 1}`;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

@Component({
  selector: 'purchase-detail',
  templateUrl: 'purchase-detail.component.html',
  styleUrl: './purchase-detail.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class PurchaseDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: dummyUserInterface) {
    // console.log(this.data);
    
  }
  
}


