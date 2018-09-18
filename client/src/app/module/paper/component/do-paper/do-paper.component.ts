import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../service/paper.service';
import { Question } from '../../../../entity/question';
import { QuestionService } from '../../../../service/question.service';
@Component({
  selector: 'app-do-paper',
  templateUrl: './do-paper.component.html',
  styleUrls: ['./do-paper.component.css']
})
export class DoPaperComponent implements OnInit {
  paperId:number;
  single:Question[];
  multi:Question[];
  truefalse:Question[];
  constructor(private route: ActivatedRoute,private paperService: PaperService,
    private router: Router, private questionService:QuestionService) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getQuestions();
  }
  getQuestions() {
    this.questionService.getQuestionsInPaper(this.paperId, "s").subscribe(result => {
      this.single = result;
    });
    this.questionService.getQuestionsInPaper(this.paperId, "m").subscribe(result => {
      this.multi = result;
    });
    this.questionService.getQuestionsInPaper(this.paperId, "t").subscribe(result => {
      this.truefalse = result;
    })
  }
  finishPaper(){
    this.paperService.finishPaper(this.paperId).subscribe(
      resultId =>{

        this.router.navigate([`paper/result/${resultId}`]);
      }
    )
  }
}
