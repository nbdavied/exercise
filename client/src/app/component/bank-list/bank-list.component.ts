import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bank } from '../../entity/bank';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {
  @Input() banks:Bank[];
  @Output() selected = new EventEmitter<number>();
  selectedId:number;
  constructor() { }

  ngOnInit() {
  }
  selectBank(id:number){
    if(this.selectedId != id){
      this.selectedId = id; 
      this.selected.emit(id);
    }
    
  }
}
