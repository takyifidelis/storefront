import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../Services/data.service';

@Pipe({
  name: 'filterProduct',
  standalone: true
})
export class FilterProductPipe implements PipeTransform {
  constructor(private dataService:DataService){}
  transform(values: any, searchTerm:string) {
    const resultArray:any =[]
    if(searchTerm === ''){
      values = [...new Set(values)]
      return values
    }
    if(searchTerm.length){
      searchTerm = searchTerm.toLowerCase()
      for (const item of values) {
        if (item.name.toLowerCase().includes(searchTerm)) {
          resultArray.push(item)
        }
      }
    } 
    return resultArray;
  }

}
