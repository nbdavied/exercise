import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakePaperComponent } from './component/make-paper/make-paper.component';
import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { PaperListComponent } from './component/paper-list/paper-list.component';
import { DoPaperComponent } from './component/do-paper/do-paper.component';
import { PaperService } from './service/paper.service'; 
import { QuesListComponent } from './component/ques-list/ques-list.component';
import { PaperQuesComponent } from './component/paper-ques/paper-ques.component';
import { QuesTypeNavComponent } from './component/ques-type-nav/ques-type-nav.component';
import { CustomMaterialModule } from '../module/custom-material/custom-material.module';
import { BankListComponent } from '../component/bank-list/bank-list.component';
@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    PaperRoutingModule
  ],
  declarations: [
    MakePaperComponent,
    PaperComponent,
    PaperListComponent,
    DoPaperComponent,
    QuesListComponent,
    PaperQuesComponent,
    QuesTypeNavComponent,
    BankListComponent
  ],
  providers:[
    PaperService
  ]
})
export class PaperModule { }
