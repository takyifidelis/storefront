import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../../../../app.routes';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { APIService } from '../../../../../Services/api.service';
import { ToastrService } from 'ngx-toastr';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let router: Router;
  let apiService: APIService;
  let toatrService: ToastrService;

  beforeEach( () => {
class MockService {
  getCustomerStoreProducts(): Observable<any>{
    const reviewProducts = {
      
    }

    return of(reviewProducts)
  }
}

class MockToatrService {
  success(message: string, title?: string, override?: any) {}
  error(message: string, title?: string, override?: any) {}
}

     TestBed.configureTestingModule({
      imports: [ReviewComponent, RouterTestingModule.withRoutes(routes)],
      providers: [{provide: APIService, useClass: MockService}, {provide: ToastrService, useClass: MockToatrService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    toatrService = TestBed.inject(ToastrService)
    apiService = TestBed.inject(APIService);
    router = TestBed.inject(Router);
    router.initialNavigation;
    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
