import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs"
import { ErrorHandler } from "../error-handler";
import { User } from '../entity/user';
import { environment } from '../../environments/environment';

const apiHost = environment.api_host;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<boolean>{
    return this.http.post<{ token: string }>(apiHost + '/api/auth/signin', {username: username, password: password}).pipe(
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
    return this.http.post<any>(apiHost + '/api/auth/signup', user);
  }
  refresh():Observable<string>{
    const body = new HttpParams().set('token', this.accessToken);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<{token:string}>(apiHost + '/api/auth/refresh', body.toString(), {headers}).pipe(
      map(result =>{
        localStorage.setItem('access_token', result.token);
        return result.token;
      })
    )
  }
  public get loggedIn():boolean{
    let token = localStorage.getItem('access_token');
    if(!token){
      return false;
    }
    //console.log(this.jwtHelper.getTokenExpirationDate());
    if(this.jwtHelper.isTokenExpired()){
      this.logout();
      return false;
    }else{
      return true;
    }
  }
  public get nickname():string{
    return this.jwtHelper.decodeToken().nic;
  }
  get accessToken():string{
    return localStorage.getItem('access_token');
  }
}
