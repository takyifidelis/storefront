import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('APIService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(APIService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
