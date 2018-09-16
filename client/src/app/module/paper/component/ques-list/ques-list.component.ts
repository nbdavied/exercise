import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../../entity/question';
import { QuestionService } from '../../../../service/question.service';
import { PaperQuestion } from '../../entity/paper-question';
import { PaperService } from '../../service/paper.service';
import { Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-ques-list',
  templateUrl: './ques-list.component.html',
  styleUrls: ['./ques-list.component.css']
})
export class QuesListComponent implements OnInit {
  @Input() type: string;
  @Input() paperId: number;
  questions: Question[];
  private selectTerm = new Subject<PaperQuestion>();
  constructor(private questionService: QuestionService, private paperService: PaperService) { }

  ngOnInit() {
    this.getQuestions();
    this.selectTerm.pipe(
      //设置保存频率2秒
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((q: PaperQuestion) => this.paperService.saveSelected(q))
    ).subscribe();
  }
  getQuestions(){
    this.questionService.getQuestionsInPaper(this.paperId, this.type).subscribe(result =>{
      this.questions = result;
    })
  }
  onSelectChange(questionId:number, selected:number[]){
    let q: PaperQuestion = new PaperQuestion();
    q.questionId = questionId;
    q.selected = selected;
    q.paperId = this.paperId;
    this.selectTerm.next(q);
  }
}
