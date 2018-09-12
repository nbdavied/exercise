import { Component, OnInit } from '@angular/core';
import { TestPaper } from '../../entity/test-paper';
import { PaperService } from '../../service/paper.service';
@Component({
  selector: 'app-paper-list',
  templateUrl: './paper-list.component.html',
  styleUrls: ['./paper-list.component.css']
})
export class PaperListComponent implements OnInit {
  papers:TestPaper[];
  constructor(private paperService: PaperService) { }

  ngOnInit() {
    this.paperService.getPapers().subscribe(result => {
      this.papers = result;
    });
  }

}
