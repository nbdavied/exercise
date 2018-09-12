import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowQuesComponent } from './component/show-ques/show-ques.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  declarations: [
    ShowQuesComponent
  ],
  exports:[
    ShowQuesComponent
  ]
})
export class QuestionModule { }
