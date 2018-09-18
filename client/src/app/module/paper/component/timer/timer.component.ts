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
  private intervalId = 0;
  private restTime:number;
  private minutes:number;
  private seconds:number;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){

  }
  start(){
    this.restTime = this.initTime;
    this.countDown();
  }
  clearTimer(){
    clearInterval(this.intervalId);
  }
  private countDown(){
    this.intervalId = window.setInterval(()=>{
      this.restTime -= 1;
      this.minutes =Math.floor(this.restTime / 60);
      this.seconds = this.restTime  % 60;
    }, 1000);
  }
}
