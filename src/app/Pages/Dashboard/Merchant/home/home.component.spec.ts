import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { APIService } from '../../../../Services/api.service';
import { DataService } from '../../../../Services/data.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: APIService;
  let dataService: DataService;
  let router: Router;
  let mockApiService: any;
  
  beforeEach(() => {
mockApiService = jasmine.createSpyObj(['editStore'])
     TestBed.configureTestingModule({
    imports: [HomeComponent, HttpClientTestingModule],
    providers: [ APIService]
    })
    .compileComponents();
    
    apiService = TestBed.inject(APIService)
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// beforeEach(async () => {
//   await TestBed.configureTestingModule({
    
// });
