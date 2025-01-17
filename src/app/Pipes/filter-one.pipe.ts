import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../Services/data.service';

@Pipe({
  name: 'filterOne',
  standalone: true
})
export class FilterOnePipe implements PipeTransform {
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
            if (item.toLowerCase().includes(searchTerm)) {
              resultArray.push(item)
            }
          }
        } else {
          this.dataService.doesNotExist.term = searchTerm
          for (const item of values) {
            if (item.name.common.toLowerCase().includes(searchTerm)) {
              resultArray.push(item)
            }
          }
      } 

    if (resultArray.length) {
      this.dataService.doesNotExist.exist = false
      this.dataService.doesNotExist.term = searchTerm
      return [...new Set(resultArray)];
    }
      this.dataService.doesNotExist.exist = true
      return [...new Set(resultArray)];
  }

}