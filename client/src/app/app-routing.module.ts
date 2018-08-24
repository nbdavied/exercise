import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowQuesComponent } from './component/show-ques/show-ques.component';
import { SelectBankComponent } from './component/select-bank/select-bank.component';
import { LoginComponent } from './component/login/login.component';
import { EditQuesComponent } from './component/edit-ques/edit-ques.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/banks', pathMatch: 'full' },
  { path: 'banks', component: SelectBankComponent},
  { path: 'question/:bankid', component: ShowQuesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'edit', component: EditQuesComponent, canActivate: [AuthGuard] }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
