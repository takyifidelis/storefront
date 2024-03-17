import { inject } from '@angular/core';
import { FilterOnePipe } from './filter-one.pipe';
import { DataService } from '../Services/data.service';

describe('FilterOnePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterOnePipe(inject(DataService));
    expect(pipe).toBeTruthy();
  });
});
