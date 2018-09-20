import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakePaperComponent } from './component/make-paper/make-paper.component';
import { PaperComponent } from './paper.component';
import { PaperListComponent } from './component/paper-list/paper-list.component';
import { DoPaperComponent } from './component/do-paper/do-paper.component';
import { AuthGuard } from '../../auth.guard';
import { ShowResultComponent } from './component/show-result/show-result.component';
import { ShowResultDetailComponent } from './component/show-result-detail/show-result-detail.component';

const paperRoutes: Routes = [
  { 
    path: 'paper', 
    component: PaperComponent,
    children:[
      { path: '', component: PaperListComponent, canActivate: [AuthGuard]},
      { path: 'new', component: MakePaperComponent, canActivate: [AuthGuard]},
      { path: ':id', component: DoPaperComponent, canActivate: [AuthGuard]},
      { path: 'result/:id', component: ShowResultComponent, canActivate: [AuthGuard]},
      { path: 'detail/:resultId', component:ShowResultDetailComponent, canActivate:[AuthGuard]}
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
