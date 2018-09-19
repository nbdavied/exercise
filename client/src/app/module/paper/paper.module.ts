import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakePaperComponent } from './component/make-paper/make-paper.component';
import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { PaperListComponent } from './component/paper-list/paper-list.component';
import { DoPaperComponent } from './component/do-paper/do-paper.component';
import { PaperService } from './service/paper.service'; 
import { QuesListComponent } from './component/ques-list/ques-list.component';
import { PaperQuesComponent } from './component/paper-ques/paper-ques.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { BankListComponent } from '../../component/bank-list/bank-list.component';
import { QuestionModule } from '../question/question.module';
import { ToTopComponent } from './component/to-top/to-top.component';
import { TimerComponent } from './component/timer/timer.component';
import { ShowResultComponent } from './component/show-result/show-result.component';
import { PaperStatusPipe } from './pipe/paper-status.pipe';
import { FloorPipe } from './pipe/floor.pipe';
@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule, ReactiveFormsModule,QuestionModule,
    PaperRoutingModule
  ],
  declarations: [
    MakePaperComponent,
    PaperComponent,
    PaperListComponent,
    DoPaperComponent,
    QuesListComponent,
    PaperQuesComponent,
    BankListComponent,
    ToTopComponent,
    TimerComponent,
    ShowResultComponent,
    PaperStatusPipe,
    FloorPipe
  ],
  providers:[
    PaperService
  ]
})
export class PaperModule { }
