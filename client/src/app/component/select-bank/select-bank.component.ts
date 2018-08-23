import { Component, OnInit } from '@angular/core';
import { Bank } from '../../entity/bank';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-select-bank',
  templateUrl: './select-bank.component.html',
  styleUrls: ['./select-bank.component.css']
})
export class SelectBankComponent implements OnInit {
  banks:Bank[];
  constructor(private bankService : BankService) { }

  ngOnInit() {
    this.getBanks();
  }
  getBanks():void{
    this.bankService.getBanks().subscribe(banks => this.banks = banks);
  }
}
