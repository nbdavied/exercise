import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaperService } from '../../service/paper.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-do-paper',
  templateUrl: './do-paper.component.html',
  styleUrls: ['./do-paper.component.css']
})
export class DoPaperComponent implements OnInit {
  paperId:number;
  constructor(private route: ActivatedRoute,private paperService: PaperService,
    private router: Router, private snackBar: MatSnackBar) {
    this.paperId = +this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
  }
  finishPaper(){
    this.paperService.finishPaper(this.paperId).subscribe(
      resultId =>{
        this.router.navigate([`paper/result/${resultId}`]);
      },
      error =>{
        this.snackBar.open("提交试卷失败", "确定", {
          duration:2000
        })
      }
    )
  }
}
