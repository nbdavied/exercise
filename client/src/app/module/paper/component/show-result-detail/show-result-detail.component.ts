import { Component, OnInit } from '@angular/core';
import { Question } from '../../../../entity/question';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from '../../service/paper.service';

@Component({
  selector: 'app-show-result-detail',
  templateUrl: './show-result-detail.component.html',
  styleUrls: ['./show-result-detail.component.css']
})
export class ShowResultDetailComponent implements OnInit {
  resultId: number;
  single: Question[];
  multi: Question[];
  truefalse: Question[];
  onlyWrong: boolean;
  constructor(private route: ActivatedRoute, private paperService: PaperService) {
    this.resultId = +this.route.snapshot.paramMap.get('resultId');
  }

  ngOnInit() {
    this.onlyWrong = false;
    this.getDetails();
  }
  toggleOnlyWrong(){
    this.onlyWrong = !this.onlyWrong;
    this.getDetails();
  }
  getDetails(){
    this.paperService.getResultDetail(this.resultId, "s", this.onlyWrong).subscribe(
      details => this.single = details
    );
    this.paperService.getResultDetail(this.resultId, "m", this.onlyWrong).subscribe(
      details => this.multi = details
    );
    this.paperService.getResultDetail(this.resultId, "t", this.onlyWrong).subscribe(
      details => this.truefalse = details
    );
  }
  scrollToTop() {
    window.scroll(0, 0);
  }
}
