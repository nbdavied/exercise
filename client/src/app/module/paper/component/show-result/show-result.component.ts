import { Component, OnInit } from '@angular/core';
import { TestResult } from '../../entity/test-result';
import { ActivatedRoute } from '@angular/router';
import { PaperService } from '../../service/paper.service';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrls: ['./show-result.component.css']
})
export class ShowResultComponent implements OnInit {
  results:TestResult[];
  paperId:number;
  constructor(private route: ActivatedRoute, private paperService: PaperService) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.getResults();
  }
  getResults(){
    this.paperService.getResults(this.paperId).subscribe(
      results => this.results = results
    );
  }
}
