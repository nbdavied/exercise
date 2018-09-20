import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../../service/question.service';
import { Question } from '../../../../entity/question';
import { UserService } from '../../../../service/user.service';
import { Subject,of } from 'rxjs';
import { PaperQuestion } from '../../../paper/entity/paper-question';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-show-ques',
  templateUrl: './show-ques.component.html',
  styleUrls: ['./show-ques.component.css']
})
export class ShowQuesComponent implements OnInit {
  @Input() question: Question;
  @Input() answer:number[];
  @Output() selectChange = new EventEmitter<number[]>();
  @Input() selectable:boolean;
  @Input() selected: number[];
  private selectTerm = new Subject<number[]>();

  constructor() { }
  ngOnInit() {
    this.selectTerm.pipe(
      //设置保存频率2秒
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((select) => of( this.selectChange.emit(select)))
    ).subscribe();
  }
  private select(choiceid: number){
    if(this.selectable){
      if(this.question.type === 'm'){
        if(!this.selected){
          this.selected = [choiceid];
        }else if(this.selected.includes(choiceid)){
          this.selected.splice(this.selected.indexOf(choiceid), 1);
        }else{
          this.selected.push(choiceid);
        }
      }else{
        this.selected=[choiceid];
      }
      this.selectTerm.next(this.selected);
    }
  }

}
