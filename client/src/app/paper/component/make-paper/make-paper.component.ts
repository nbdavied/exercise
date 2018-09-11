import { Component, OnInit } from '@angular/core';
import { Bank } from '../../../entity/bank';
import { BankService } from '../../../service/bank.service';

@Component({
  selector: 'app-make-paper',
  templateUrl: './make-paper.component.html',
  styleUrls: ['./make-paper.component.css']
})
export class MakePaperComponent implements OnInit {
  banks:Bank[];
  selectedBankId:number;
  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.getBanks();
  }
  private getBanks(){
    this.bankService.getBanks().subscribe(
      banks => this.banks = banks
    );
  }
  onBankSelected(bankId: number){
    this.selectedBankId = bankId;
  }
}
