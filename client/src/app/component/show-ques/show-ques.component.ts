import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question.service';
import { Question } from '../../entity/question';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-show-ques',
  templateUrl: './show-ques.component.html',
  styleUrls: ['./show-ques.component.css']
})
export class ShowQuesComponent implements OnInit {
  question: Question;
  nextType: string;
  selected: number[];
  answer:number[];
  currentId:number;
  onlyWrong: boolean;
  constructor(private questionService:QuestionService,
    private route: ActivatedRoute,
    public userService: UserService) { }

  ngOnInit() {
    this.currentId = 0;
    this.nextType = 'queue';
    this.selected = [];
    this.answer = [];
    this.onlyWrong = false;
    this.getQuestion();
  }
  public getQuestion(){
    const bankid = +this.route.snapshot.paramMap.get('bankid');
    if(this.nextType == 'random'){
      this.questionService.randomQuestion(bankid, this.onlyWrong)
        .subscribe(question => {
          this.question = question;
          this.currentId = question.id;
        }
        );
    }else{
      var last = this.currentId;
      this.questionService.nextQuestion(bankid, last, this.onlyWrong)
        .subscribe(question => {
          this.question = question;
          this.currentId = question.id;
        });
    }
    this.selected = [];
    this.answer = [];
  }
  public getAnswer() {
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
