import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  //以下时间都以秒作单位
  //初始时间
  @Input() initTime:number;
  //触发事件间隔时间
  @Input() eventInterval:number;
  //触发时间到后触发事件，返回剩余时间
  @Output() timeup = new EventEmitter<number>();
  restTime:number;
  private timer;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){

  }
}
