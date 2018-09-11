import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaperComponent } from './component/make-paper/make-paper.component';
import { PaperComponent } from './paper.component';
import { PaperListComponent } from './component/paper-list/paper-list.component';
import { DoPaperComponent } from './component/do-paper/do-paper.component';

const paperRoutes: Routes = [
  { 
    path: 'paper', 
    component: PaperComponent,
    children:[
      {path:'', component: PaperListComponent},
      {path:'new', component: MakePaperComponent},
      {path:':id', component: DoPaperComponent}
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
