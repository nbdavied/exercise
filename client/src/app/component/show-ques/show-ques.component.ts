import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../service/question.service';
import { Question } from '../../entity/question';

@Component({
  selector: 'app-show-ques',
  templateUrl: './show-ques.component.html',
  styleUrls: ['./show-ques.component.css']
})
export class ShowQuesComponent implements OnInit {
  question: Question;
  nextType: string;
  constructor(private questionService:QuestionService) { }

  ngOnInit() {
  }
  
}
