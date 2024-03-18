import { inject } from '@angular/core';
import { FilterProductPipe } from './filter-product.pipe';
import { DataService } from '../Services/data.service';

describe('FilterProductPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProductPipe(inject(DataService));
    expect(pipe).toBeTruthy();
  });
});
