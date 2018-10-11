import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../service/question.service';
import { Question } from '../../entity/question';
import { UserService } from '../../service/user.service';
import { ShowQuesComponent } from '../../module/question/component/show-ques/show-ques.component';

@Component({
  selector: 'app-single-ques',
  templateUrl: './single-ques.component.html',
  styleUrls: ['./single-ques.component.css']
})
export class SingleQuesComponent implements OnInit {
  question: Question;
  nextQuestion: Question;
  lastQuestion: Question;
  nextType: string;
  selected: number[];
  answer: number[];
  currentId: number;
  onlyWrong: boolean;
  type:string;
  @ViewChild(ShowQuesComponent)
  private showQuesComponent: ShowQuesComponent;

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    public userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('last_question_id')){
      this.currentId = parseInt(localStorage.getItem('last_question_id'));
    }else{
      this.currentId = 0;
    }
    
    this.nextType = 'queue';
    this.selected = [];
    this.answer = [];
    this.onlyWrong = false;
    this.getQuestion();
  }
  public getQuestion() {
    const bankid = +this.route.snapshot.paramMap.get('bankid');
    if (this.nextType == 'random') {
      this.questionService.randomQuestion(bankid, this.onlyWrong, this.type)
        .subscribe(question => {
          this.question = question;
          this.currentId = question.id;
        }
        );
    } else {
      var last = this.currentId;
      this.questionService.nextQuestion(bankid, last, this.onlyWrong, this.type)
        .subscribe(question => {
          this.question = question;
          this.currentId = question.id;
          localStorage.setItem('last_question_id', this.currentId.toString());
        });
    }
    this.showQuesComponent.selected = [];
    this.selected = [];
    this.answer = [];
  }

  public getAnswer() {
    this.questionService.getAnswer(this.question.id, this.selected).subscribe(answer => this.answer = answer);
  }
  public select(choiceid: number) {
    if (this.question.type === 'm') {
      if (this.selected.includes(choiceid)) {
        this.selected.splice(this.selected.indexOf(choiceid), 1);
      } else {
        this.selected.push(choiceid);
      }
    } else {
      this.selected = [choiceid];
    }
  }
  public removeFromWrong(){
    this.questionService.removeFromWrongCollection(this.question.id).subscribe();
    this.getQuestion();
  }
  onSelectChange(selected: number[]){
    this.selected = selected;
  }
}
