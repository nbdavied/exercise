import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../../entity/question';
import { QuestionService } from '../../../../service/question.service';
@Component({
  selector: 'app-ques-list',
  templateUrl: './ques-list.component.html',
  styleUrls: ['./ques-list.component.css']
})
export class QuesListComponent implements OnInit {
  @Input() type: string;
  @Input() paperId: number;
  questions: Question[];
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions(){
    this.questionService.getQuestionsInPaper(this.paperId, this.type).subscribe(result =>{
      this.questions = result;
    })
  }
}
