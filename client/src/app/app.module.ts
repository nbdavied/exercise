import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionService } from './service/question.service';
import { UserService } from './service/user.service';
import { SelectBankComponent } from './component/select-bank/select-bank.component';
import { EditQuesComponent } from './component/edit-ques/edit-ques.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { CustomMaterialModule } from './module/custom-material/custom-material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SingleQuesComponent } from './component/single-ques/single-ques.component';
import { PaperModule} from './module/paper/paper.module';
import { QuestionModule } from './module/question/question.module';
import { MatSnackBar } from '@angular/material';
import { HandleErrorService } from './service/handle-error.service';
import { environment } from '../environments/environment';
import { RefreshTokenInterceptor } from './interceptor/refresh-token-interceptor';
import { IcpbarComponent } from './component/icpbar/icpbar.component';

const jwtDomain = environment.jwt_domain;

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SelectBankComponent,
    EditQuesComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    SingleQuesComponent,
    IcpbarComponent
  ],
  imports: [
    BrowserModule,
    PaperModule,
    QuestionModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    CustomMaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [jwtDomain],
        blacklistedRoutes: [jwtDomain + '/api/auth/signin']
      }
    })
  ],
  providers: [
    QuestionService,
    UserService,
    HandleErrorService,
    // JwtInterceptor,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useExisting: JwtInterceptor,
    //   multi: true
    // },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:RefreshTokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
