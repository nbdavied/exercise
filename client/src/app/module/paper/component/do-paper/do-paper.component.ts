import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../service/paper.service';
@Component({
  selector: 'app-do-paper',
  templateUrl: './do-paper.component.html',
  styleUrls: ['./do-paper.component.css']
})
export class DoPaperComponent implements OnInit {
  paperId:number;
  constructor(private route: ActivatedRoute,private paperService: PaperService,
    private router: Router) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }
  finishPaper(){
    this.paperService.finishPaper(this.paperId).subscribe(
      resultId =>{

        this.router.navigate([`paper/result/${resultId}`]);
      }
    )
  }
}
