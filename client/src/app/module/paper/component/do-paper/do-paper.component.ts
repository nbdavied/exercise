import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../service/paper.service';
import { Question } from '../../../../entity/question';
import { QuestionService } from '../../../../service/question.service';
import { MatSnackBar } from '@angular/material';
import { TimerComponent } from '../timer/timer.component';
import { PaperQuestion } from '../../entity/paper-question';
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
  restTime:number;
  @ViewChild(TimerComponent)
  private timer:TimerComponent;
  constructor(private route: ActivatedRoute,private paperService: PaperService,
    private router: Router, private questionService:QuestionService, 
    private snackBar: MatSnackBar) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.startPaper();
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
  startPaper(){
    this.paperService.startPaper(this.paperId).subscribe(
      paper => {
        this.restTime = paper.restTime;
        this.getQuestions();
        this.timer.start();
      }
    )
  }
  finishPaper(){
    this.paperService.finishPaper(this.paperId).subscribe(
      resultId =>{
        this.router.navigate([`paper/result/${this.paperId}`]);
      },
      error =>{
        this.snackBar.open("提交试卷失败", "确定", {
          duration:2000
        })
      }
    )
  }
  updateRestTime(rest:number){
    this.paperService.updateRestTime(this.paperId, rest).subscribe();
  }
  scrollToTop(){
    window.scroll(0,0);
  }
  onSelectChange(q : PaperQuestion){
    this.paperService.saveSelected(q).subscribe();
  }
}
