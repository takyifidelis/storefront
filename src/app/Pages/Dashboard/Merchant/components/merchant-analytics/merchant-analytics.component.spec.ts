import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAnalyticsComponent } from './merchant-analytics.component';
import { APIService } from '../../../../../Services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Payout } from '../../../../../interfaces/all-interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MerchantAnalyticsComponent', () => {
  let component: MerchantAnalyticsComponent;
  let fixture: ComponentFixture<MerchantAnalyticsComponent>;
let apiService: APIService;

  beforeEach( () => {
class MockService {
   getPayouts(): Observable<Payout> {
    const payout: Payout = {
      code: 'string',
      data: [
        {
          amount: 67,
      commission: 15,
      createdAt: '07-mar-20',
      currency: 'string',
      id: 'string',
      order: 'string',
      orderPayout: {
        amount: 23,
        orderId: 'string',
      },
      payoutId: 'string',
      store: 'string',
      updatedAt: 'string',
      wallet: 'string',
    }],
      message: 'string',
      type: 'string',
    }

    return of(payout)
  }
}

     TestBed.configureTestingModule({
      imports: [MerchantAnalyticsComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [{provide: APIService, useClass: MockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    apiService = TestBed.inject(APIService);
    fixture = TestBed.createComponent(MerchantAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
