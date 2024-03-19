import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderModalComponent } from './order-modal.component';
import { APIService } from '../../../../../Services/api.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

describe('OrderModalComponent', () => {
  let component: OrderModalComponent;
  let fixture: ComponentFixture<OrderModalComponent>;
  let apiService: APIService;
  let toastr: ToastrService;

  beforeEach(() => {
    class MockToastrService {
      success(message: string, title?: string, override?: any) {}
      error(message: string, title?: string, override?: any) {}
    }

    class MockService {
      constructor() {}
      getOrders(): Observable<any> {
        const order = {
          amount: 45,
          createdAt: '07-mar-23',
          id: 'string',
          items: [
            {
              createdAt: '07-mar-23',
              id: 'string',
              image: 'string',
              name: 'string',
              order: 'string',
              price: 67,
              product: 'string',
              quantity: 4,
              total: 100,
              updatedAt: '07-mar-23',
            },
          ],
          orderId: 'string',
          orderShipping: {
            apartmentNo: 'string',
            city: 'string',
            countryCode: 'string',
            customer: 'string',
            id: 'string',
            isActive: true,
            name: 'string',
            phone: 'string',
            postalCode: 'string',
            streetAddress: 'string',
          },
          paid: true,
          status: 'string',
          storeOrder: {
            businessStore: {
              businessName: 'string',
            },
            storeName: 'string',
          },
          updatedAt: '07-mar-23',
        };

        return of(order);
      }
    }

    TestBed.configureTestingModule({
      imports: [OrderModalComponent, HttpClientTestingModule],
      providers: [
        { provide: APIService, useClass: MockService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        {provide: ToastrService, useClass: MockToastrService}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    toastr = TestBed.inject(ToastrService);
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(OrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
