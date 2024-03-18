import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeEcommerceComponent } from './home-ecommerce.component';
import { APIService } from '../../../../../Services/api.service';

describe('HomeEcommerceComponent', () => {
  let component: HomeEcommerceComponent;
  let fixture: ComponentFixture<HomeEcommerceComponent>;
  let apiService: APIService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HomeEcommerceComponent,HttpClientTestingModule], 
      providers: [APIService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEcommerceComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(APIService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
