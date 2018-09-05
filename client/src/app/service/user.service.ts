import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs"
import { ErrorHandler } from "../error-handler";
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<boolean>{
    return this.http.post<{ token: string }>('/api/auth/signin', {username: username, password: password}).pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
  }
  logout(){
    localStorage.removeItem('access_token');
  }
  signup(user: User): Observable<any>{
    return this.http.post<any>('/api/auth/signup', user);
  }
  public get loggedIn():boolean{
    let token = localStorage.getItem('access_token');
    if(!token){
      return false;
    }
    if(!this.jwtHelper.isTokenExpired()){
      return true;
    }else{
      return false;
    }
  }
  public get username():string{
    console.log(this.jwtHelper.decodeToken());
    return this.jwtHelper.decodeToken()
  }
}
