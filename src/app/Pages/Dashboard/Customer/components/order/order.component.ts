import {AfterViewInit, Component, ViewChild,Inject} from '@angular/core';
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
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { dummyUserInterface } from '../../../../../interface/dummy-user.model';

@Component({
  selector: 'app-order',
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
    MatDialogModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})

export class OrderComponent {
  displayedColumns: string[] = ['checkbox', 'orderNumber', 'store', 'status','date', 'price', 'bubble'];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  users = [
    {
        "checkbox": "1",
        "orderNumber": "#1233893",
        "store": "shopNest",
        "status": "Delievered",
        "date": "21/09/2023",
        "price": "$52.00"
    },
    {
        "checkbox": "1",
        "orderNumber": "#1233893",
        "store": "shopNest",
        "status": "Delievered",
        "date": "21/09/2023",
        "price": "$52.00"
    },
    ]

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }
  moreVert(e:dummyUserInterface) {
    this.dialog.open(OrderModalComponent, {
      data: {
        itemName: 'hat',
        itemPrice: 'hat',
      }, 
        width: '479px', 
        position: {right:'50px', top: '10%'} 
    });
  }

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
