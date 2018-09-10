import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaperComponent } from './component/make-paper/make-paper.component';
import { PaperComponent } from './paper.component';
import { PaperListComponent } from './component/paper-list/paper-list.component';

const paperRoutes: Routes = [
  { 
    path: 'paper', 
    component: PaperComponent,
    children:[
      {path:'', component: PaperListComponent},
      {path:'new', component: MakePaperComponent}
    ]
}
]
@NgModule({
  imports: [
    RouterModule.forChild(paperRoutes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class PaperRoutingModule { }
