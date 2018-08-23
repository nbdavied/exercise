import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question.service';
import { Question } from '../../entity/question';

@Component({
  selector: 'app-show-ques',
  templateUrl: './show-ques.component.html',
  styleUrls: ['./show-ques.component.css']
})
export class ShowQuesComponent implements OnInit {
  question: Question = new Question;
  nextType: string;
  selected: number[];
  answer:number[];
  constructor(private questionService:QuestionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.nextType = 'queue';
    this.selected = [];
    this.answer = [];
    this.getQuestion();
  }
  private getQuestion(){
    const bankid = +this.route.snapshot.paramMap.get('bankid');
    this.questionService.getQuestion(bankid, this.nextType)
      .subscribe(question => this.question = question);
    this.selected = [];
    this.answer = [];
  }
  private getAnswer() {
    this.questionService.getAnswer(this.question.id, this.selected).subscribe(answer => this.answer = answer);
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
  }
}
