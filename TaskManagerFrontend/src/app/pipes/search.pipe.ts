import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(valueList: any, searchTask: string, searchParentTask: string, searchPriorityFrom: number, searchPriorityTo: number, searchStartDate: string, searchEndDate: string): any {
    let tempList = valueList;
    if (searchTask && searchTask.trim()) {
      searchTask = searchTask.trim().toLowerCase();
      tempList = valueList.filter(items => {
        if (items['task'].toLowerCase().includes(searchTask))
          return true;
        return false;
      })
    }
    if (searchParentTask && searchParentTask.trim()) {
      searchParentTask = searchParentTask.trim().toLowerCase();
      tempList = valueList.filter(items => {
        if (items['parentTask'] != null && items['parentTask'].toLowerCase().includes(searchParentTask))
          return true;
        return false;
      })
    }

    if (searchPriorityFrom || searchPriorityTo) {
      if (searchPriorityFrom && searchPriorityTo)
        tempList = valueList.filter(items => {
          if (items['priority'] >= searchPriorityFrom && items['priority'] <= searchPriorityTo)
            return true;
          return false;
        })
      else if (searchPriorityFrom)
        tempList = valueList.filter(items => {
          if (items['priority'] >= searchPriorityFrom)
            return true;
          return false;
        })
      else
        tempList = valueList.filter(items => {
          if (items['priority'] <= searchPriorityTo)
            return true;
          return false;
        })
    }

    if (searchStartDate || searchEndDate) {
      if (searchStartDate && searchEndDate)
        tempList = valueList.filter(items => {
          if (items['startDate'].includes(searchStartDate) && items['endDate'].includes(searchEndDate))
            return true;
          return false;
        })
      else if (searchStartDate)
        tempList = valueList.filter(items => {
          if (items['startDate'].includes(searchStartDate))
            return true;
          return false;
        })
      else
        tempList = valueList.filter(items => {
          if (items['endDate'].includes(searchEndDate))
            return true;
          return false;
        })
    }
    return tempList;
  }
}
