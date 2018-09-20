import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paperStatus'
})
export class PaperStatusPipe implements PipeTransform {

  transform(value: string): string {
    if(value == "0"){
      return "未开始";
    }else if(value == "1"){
      return "进行中";
    }else if(value == "2"){
      return "已完成";
    }
    return "未知状态";
  }

}
