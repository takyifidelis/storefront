import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import { APIService } from '../../../../../Services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Shop } from '../../../../../interfaces/all-interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;
let apiService: APIService;

  beforeEach( () => {
    class MockService{
      getStores(): Observable<Shop>{
        const shops ={

          code: 'string',
          data: [{
            business: 'string',
            createdAt: 'string',
            currency: 'string',
            id: 'string',
            storeName: 'string',
            storeType: 'string',
            template: { 
              id: 'string', 
              options: 'string', 
              store: 'string' },
            updatedAt: 'string',
          }],
          message: 'string',
          type: 'string',
        }

        return of(shops);
      }
    
  }


     TestBed.configureTestingModule({
      imports: [ShopComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: APIService, useClass: MockService}]
    })
    .compileComponents();
    
   
  });

  beforeEach(() => {
    apiService: TestBed.inject(APIService);
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
