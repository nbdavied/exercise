import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowQuesComponent } from './component/show-ques/show-ques.component';
import { QuestionService } from './service/question.service';
import { UserService } from './service/user.service';
import { SelectBankComponent } from './component/select-bank/select-bank.component';
import { EditQuesComponent } from './component/edit-ques/edit-ques.component';
import { LoginComponent } from './component/login/login.component';
import { LoginBarComponent } from './component/login-bar/login-bar.component';
import { SignupComponent } from './component/signup/signup.component';
import { CustomMaterialModule } from './module/custom-material/custom-material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SingleQuesComponent } from './component/single-ques/single-ques.component';
import { PaperModule} from './paper/paper.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ShowQuesComponent,
    SelectBankComponent,
    EditQuesComponent,
    LoginComponent,
    LoginBarComponent,
    SignupComponent,
    NavbarComponent,
    SingleQuesComponent
  ],
  imports: [
    BrowserModule,
    PaperModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CustomMaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [
    QuestionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
