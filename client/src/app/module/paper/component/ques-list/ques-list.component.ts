import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../../entity/question';
import { QuestionService } from '../../../../service/question.service';
import { PaperQuestion } from '../../entity/paper-question';
import { PaperService } from '../../service/paper.service';
@Component({
  selector: 'app-ques-list',
  templateUrl: './ques-list.component.html',
  styleUrls: ['./ques-list.component.css']
})
export class QuesListComponent implements OnInit {
  @Input() paperId: number;
  @Input() questions: Question[];
  constructor(private questionService: QuestionService, private paperService: PaperService) { }

  ngOnInit() {
  }

  onSelectChange(questionId:number, selected:number[]){
    let q: PaperQuestion = new PaperQuestion();
    q.questionId = questionId;
    q.selected = selected;
    q.paperId = this.paperId;
    //this.selectTerm.next(q);
    this.paperService.saveSelected(q).subscribe();
  }
}
