import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-do-paper',
  templateUrl: './do-paper.component.html',
  styleUrls: ['./do-paper.component.css']
})
export class DoPaperComponent implements OnInit {
  paperId:number;
  constructor(private route: ActivatedRoute,) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }

}
