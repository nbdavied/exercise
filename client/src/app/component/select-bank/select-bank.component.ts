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
  showlarge:boolean;
  constructor(private bankService : BankService) { }

  ngOnInit() {
    this.getBanks();
    this.showlarge = false;
  }
  getBanks():void{
    this.bankService.getBanks().subscribe(banks => this.banks = banks);
  }
  closelarge():void{
    this.showlarge = false;
  }
  showLarge():void{
    this.showlarge = true;
  }
}
