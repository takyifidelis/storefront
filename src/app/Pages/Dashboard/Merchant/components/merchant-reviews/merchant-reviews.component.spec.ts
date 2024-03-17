import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantReviewsComponent } from './merchant-reviews.component';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIService } from '../../../../../Services/api.service';

describe('MerchantReviewsComponent', () => {
  let component: MerchantReviewsComponent;
  let fixture: ComponentFixture<MerchantReviewsComponent>;
  let apiService: APIService;

  beforeEach( () => {
    class MockService {
      constructor() {}
  
      getReviews(): Observable<any> {
        const review: any = {
          code: 'message',
          message: 'good',
          type: 'business',
          data: [
            {
              id: 'string',
              replies: ['string', 'dhdjyd'],
              productReview: {
                id: 'string',
                name: 'string',
                images: [{ url: 'eutinjgdbg' }, {url: 'fkdhfiehie'}],
              },
              orderReview: {
                id: 'string',
                paid: true,
                orderId: 'tietie',
                status: 'processing',
                currency: 'USD',
                items: [{
                  name: 'string',
                  image: 'string',
                  price: 3,
                  total: 7,
                  discount: 6,
                  variations: [
                    {
                      type: 'string',
  values: [
    'erer','rere','erere'
  ],
                    }
                  ],
                  product: 'string',
                }],
              },
              customerReview: {
                firstName: 'ama',
                lastName: 'hagan',
              },
              createdAt: 'string',
              rating: 8,
              remarks: 'good',
              comment: 'sdhuher',
            }
          ]
        }
        return of(review);
  
      }
    }

     TestBed.configureTestingModule({
      imports: [MerchantReviewsComponent, HttpClientTestingModule],
      providers: [{provider: APIService, useClass: MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(MerchantReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



  

  