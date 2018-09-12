import { Component, OnInit } from '@angular/core';
import { Bank } from '../../../entity/bank';
import { BankService } from '../../../service/bank.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuesNum } from '../../ques-num';
import { TestPaper } from '../../entity/test-paper';

@Component({
  selector: 'app-make-paper',
  templateUrl: './make-paper.component.html',
  styleUrls: ['./make-paper.component.css']
})
export class MakePaperComponent implements OnInit {
  banks:Bank[];
  typeFormGroup:FormGroup;
  scoreFormGroup:FormGroup;
  quesNum: QuesNum;
  newpaper: TestPaper;
  constructor(private bankService: BankService, private _formBuilder: FormBuilder) { }

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
  submitPaper(){
    
  }
}
