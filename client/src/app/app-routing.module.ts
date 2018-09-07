import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectBankComponent } from './component/select-bank/select-bank.component';
import { LoginComponent } from './component/login/login.component';
import { EditQuesComponent } from './component/edit-ques/edit-ques.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './component/signup/signup.component';
import { SingleQuesComponent } from './component/single-ques/single-ques.component';

const routes: Routes = [
  { path: '', redirectTo: '/banks', pathMatch: 'full' },
  { path: 'banks', component: SelectBankComponent},
  { path: 'question/:bankid', component: SingleQuesComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'edit', component: EditQuesComponent, canActivate: [AuthGuard] }
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
