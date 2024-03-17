import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { APIService } from '../../../../../Services/api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Order } from '../../../../../interfaces/all-interfaces';
import { Observable, of } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let apiService: APIService;

  beforeEach( () => {
     class MockAPIService {
      constructor() {}
      getOrders(): Observable<Order[]> {
        // Return a mock set of orders
        const orders: Order[] = [
          // Sample order data
          {
            code: 'message',
            type: 'customer',
            message: 'good',
            data: [
              {
                amount: 21,
                createdAt: '21-march-02',
                id: '23yud',
                items: [
                  {
                    createdAt: '21-march-02',
                    id: 'teiyt',
                    image: 'itietiutr',
                    name: 'string',
                    order: 'eitijtkg',
                    price: 2,
                    product: 'string',
                    quantity: 3,
                    total: 45,
                    updatedAt: '21-April-06',
                  }
                ],
                orderId: 'string',
                orderShipping: {
                  apartmentNo: '445',
                  city: 'takoradi',
                  countryCode: 'CA',
                  customer: 'string',
                  id: 'rytuet',
                  isActive: false,
                  name: 'Adowoa',
                  phone: '0234557878',
                  postalCode: 'string',
                  streetAddress: 'ANAJI steet',
                },
                paid: true,
                status: 'processing',
                storeOrder: {
                  businessStore: {
                    businessName: 'Fidelis',
                  },
                  storeName: 'string',
                },
                updatedAt: '02-mrch-04',
              }
            ]
          }
        ];
    
        // Return the orders as an Observable
        return of(orders);
      }
    }

     TestBed.configureTestingModule({
      imports: [OrderComponent ,HttpClientTestingModule],
      providers: [
        // Provide the MockAPIService directly
        { provide: APIService, useClass: MockAPIService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(APIService)
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});