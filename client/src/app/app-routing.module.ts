import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowQuesComponent } from './component/show-ques/show-ques.component';
import { SelectBankComponent } from './component/select-bank/select-bank.component';


const routes: Routes = [
  { path: '', redirectTo: '/banks', pathMatch: 'full' },
  { path: 'banks', component: SelectBankComponent},
  { path: 'question/:bankid', component: ShowQuesComponent }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
