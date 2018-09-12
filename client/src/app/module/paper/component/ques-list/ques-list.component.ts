import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../../../entity/question';
@Component({
  selector: 'app-ques-list',
  templateUrl: './ques-list.component.html',
  styleUrls: ['./ques-list.component.css']
})
export class QuesListComponent implements OnInit {
  @Input() type: string;
  @Input() questions: Question[];
  constructor() { }

  ngOnInit() {
  }

}
