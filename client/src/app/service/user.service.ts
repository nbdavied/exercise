import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs"
import { ErrorHandler } from "../error-handler";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string>{
    return this.http.post<string>('/api/user/auth', {username: username, password: password}).pipe(
      tap(result => {
        localStorage.setItem('access_token', result);
      })
    );
  }
  logout(){
    localStorage.removeItem('access_token');
  }
}
