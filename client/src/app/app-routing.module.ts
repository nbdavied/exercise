import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowQuesComponent } from './component/show-ques/show-ques.component';

const routes: Routes = [
  { path: '', redirectTo: '/question', pathMatch: 'full' },
  { path: 'question', component: ShowQuesComponent }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
