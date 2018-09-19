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
  //心跳间隔
  @Input() heartbeatTime:number;
  //触发心跳事件，返回剩余时间
  @Output() heartbeat = new EventEmitter<number>();
  //触发时间到后触发事件
  @Output() timeup = new EventEmitter();
  private intervalId = 0;
  private restTime:number;
  minutes:number;
  seconds:number;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.restTime = this.initTime;
    
  }
  start(){
    this.countDown();
  }
  clearTimer(){
    clearInterval(this.intervalId);
  }
  private countDown(){
    this.intervalId = window.setInterval(()=>{
      this.restTime -= 1;
      this.minutes = Math.floor(this.restTime / 60);
      this.seconds = this.restTime  % 60;
      if(this.restTime <= 0){
        this.clearTimer();
        this.timeup.emit();
      }
      if((this.initTime - this.restTime) % this.heartbeatTime == 0){
        //每隔一段时间发送剩余时间
        this.heartbeat.emit(this.restTime);
      }
    }, 1000);
  }
}
