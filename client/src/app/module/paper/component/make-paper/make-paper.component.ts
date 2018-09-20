import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bank } from '../../../../entity/bank';
import { BankService } from '../../../../service/bank.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuesNum } from '../../ques-num';
import { TestPaper } from '../../entity/test-paper';
import { PaperService } from '../../service/paper.service';
import { MatSnackBar } from '@angular/material';
import { HandleErrorService } from '../../../../service/handle-error.service';
@Component({
  selector: 'app-make-paper',
  templateUrl: './make-paper.component.html',
  styleUrls: ['./make-paper.component.css']
})
export class MakePaperComponent implements OnInit {
  banks:Bank[];
  typeFormGroup:FormGroup;
  scoreFormGroup:FormGroup;
  timeFormGroup:FormGroup;
  quesNum: QuesNum;
  newpaper: TestPaper;
  totalTime: number;
  constructor(private bankService: BankService, private _formBuilder: FormBuilder,
    private paperService: PaperService, private router: Router,
    private snackBar: HandleErrorService) { }

  ngOnInit() {
    this.newpaper = new TestPaper();
    this.getBanks();
    this.typeFormGroup = this._formBuilder.group({
      sNum:['', [Validators.required, Validators.max(0)]],
      mNum: ['', [Validators.required, Validators.max(0)]],
      tNum: ['', [Validators.required, Validators.max(0)]]
    });
    this.scoreFormGroup = this._formBuilder.group({
      sScore:['',[Validators.required]],
      mScore: ['', [Validators.required]],
      tScore: ['', [Validators.required]],
    });
    this.timeFormGroup = this._formBuilder.group({
      time:['',[Validators.required]]
    })
  }
  private getBanks(){
    this.bankService.getBanks().subscribe(
      banks => this.banks = banks
    );
  }
  onBankSelected(bankId: number){
    this.newpaper.bankId = bankId;
    this.bankService.getQuesNum(bankId).subscribe(
      result => {
        this.quesNum = result;
        this.typeFormGroup.controls["sNum"].setValidators([Validators.required, Validators.max(result.snum)]);
        this.typeFormGroup.controls["mNum"].setValidators([Validators.required, Validators.max(result.mnum)]);
        this.typeFormGroup.controls["tNum"].setValidators([Validators.required, Validators.max(result.tnum)]);
      }
    );
  }
  scoreChange(){
    let totalScore = this.newpaper.sScore * this.newpaper.sNum
                      + this.newpaper.mScore * this.newpaper.mNum
                      + this.newpaper.tScore * this.newpaper.tNum;
    this.newpaper.totalScore = totalScore;
  }
  submitPaper(){
    if(!this.totalTime){
      this.snackBar.openSnackBar("请输入考试时间");
      return;
    }
    this.newpaper.totalTime = this.totalTime * 60;
    this.paperService.createPaper(this.newpaper).subscribe(result =>{
      this.router.navigateByUrl('/paper');
    });
  }
}
