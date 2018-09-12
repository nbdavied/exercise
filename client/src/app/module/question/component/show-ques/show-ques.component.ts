import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../../service/question.service';
import { Question } from '../../../../entity/question';
import { UserService } from '../../../../service/user.service';

@Component({
  selector: 'app-show-ques',
  templateUrl: './show-ques.component.html',
  styleUrls: ['./show-ques.component.css']
})
export class ShowQuesComponent implements OnInit {
  @Input() question: Question;
  @Input() answer:number[];
  @Output() selectChange = new EventEmitter<number[]>();
  public selected: number[];

  constructor() { }
  ngOnInit() {
    this.selected = [];
  }
  private select(choiceid: number){
    if(this.question.type === 'm'){
      if(this.selected.includes(choiceid)){
        this.selected.splice(this.selected.indexOf(choiceid), 1);
      }else{
        this.selected.push(choiceid);
      }
    }else{
      this.selected=[choiceid];
    }
    this.selectChange.emit(this.selected);
  }
}
