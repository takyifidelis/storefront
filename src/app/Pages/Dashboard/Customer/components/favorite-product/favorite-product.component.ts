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

export interface dummyUserInterface {
  checkbox: string;
  name: any;
  store: string;
  categories: string;
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
      MatDialogModule
    ],
  templateUrl: './favorite-product.component.html',
  styleUrl: './favorite-product.component.scss'
})
export class FavoriteProductComponent {
  displayedColumns: string[] = ['checkbox', 'name', 'store', 'categories','bubble'];
  dataSource: MatTableDataSource<dummyUserInterface>;
  selection = new SelectionModel<dummyUserInterface>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // creatine a dummy user data source for the table
  users = [
    {
        "checkbox": "1",
        "name": "Asher A.",
        "store": "44",
        "categories": "peach"
    },
    {
        "checkbox": "2",
        "name": "Charlotte J.",
        "store": "29",
        "categories": "pineapple"
    },
    {
        "checkbox": "3",
        "name": "Isla O.",
        "store": "44",
        "categories": "lychee"
    },
    {
        "checkbox": "4",
        "name": "Violet T.",
        "store": "45",
        "categories": "lime"
    },
    {
        "checkbox": "5",
        "name": "Cora A.",
        "store": "43",
        "categories": "lychee"
    },
    {
        "checkbox": "6",
        "name": "Jasper J.",
        "store": "49",
        "categories": "lime"
    },
    {
        "checkbox": "7",
        "name": "Arthur A.",
        "store": "100",
        "categories": "peach"
    },
    {
        "checkbox": "8",
        "name": "Asher A.",
        "store": "14",
        "categories": "lychee"
    },
    {
        "checkbox": "9",
        "name": "Arthur C.",
        "store": "19",
        "categories": "peach"
    },
    {
        "checkbox": "10",
        "name": "Atticus T.",
        "store": "38",
        "categories": "kiwi"
    },
    {
        "checkbox": "11",
        "name": "Theodore O.",
        "store": "43",
        "categories": "kiwi"
    },
    {
        "checkbox": "12",
        "name": "Jasper T.",
        "store": "91",
        "categories": "lime"
    },
    {
        "checkbox": "13",
        "name": "Jasper C.",
        "store": "46",
        "categories": "mango"
    },
    {
        "checkbox": "14",
        "name": "Theodore T.",
        "store": "17",
        "categories": "lychee"
    },
    {
        "checkbox": "15",
        "name": "Levi C.",
        "store": "56",
        "categories": "lychee"
    },
    {
        "checkbox": "16",
        "name": "Isabella I.",
        "store": "84",
        "categories": "lychee"
    },
    {
        "checkbox": "17",
        "name": "Violet E.",
        "store": "55",
        "categories": "pomegranate"
    },
    {
        "checkbox": "18",
        "name": "Olivia A.",
        "store": "57",
        "categories": "pomegranate"
    },
    {
        "checkbox": "19",
        "name": "Oliver O.",
        "store": "62",
        "categories": "peach"
    },
    {
        "checkbox": "20",
        "name": "Levi O.",
        "store": "67",
        "categories": "mango"
    }
]
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }
  moreVert(e:dummyUserInterface) {
    this.dialog.open(PurchaseDetailComponent, {
      data: {
        animal: 'panda',
      },
    });
    // console.log(e);
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
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class PurchaseDetailComponent {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: dummyUserInterface) {
  //   console.log('kji');
    
  // }
  
}


