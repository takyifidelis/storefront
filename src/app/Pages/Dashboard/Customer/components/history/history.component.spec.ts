import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../../../../../Services/api.service';
import { Observable, of } from 'rxjs';
import { SavedProducts } from '../../../../../interfaces/all-interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
let apiService: APIService;


  beforeEach( () => {
class MockService {
  getHistoryProducts(): Observable<SavedProducts> {
    const product: SavedProducts = {
      code: 'string',
      message: 'string',
      type: 'string',
      data: [{
        category: 'string',
        discount: 7,
        id: 'string',
        images: [{ url: 'string' }],
        isActive: true,
        name: 'string',
        price: 9,
        quantity: 7,
        storeProducts: { storeName: 'string' },
        variations:[{type: 'string', values: ['sjshfj', 'sfhsaufuf']}]
      }]
    };
    return of(product)
  }
}
     TestBed.configureTestingModule({
      imports: [HistoryComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: APIService, useClass: MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
