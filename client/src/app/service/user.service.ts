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

  login(username: string, password: string): Observable<boolean>{
    return this.http.post<{ token: string }>('/api/login', {username: username, password: password}).pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    );
  }
  logout(){
    localStorage.removeItem('access_token');
  }
}
