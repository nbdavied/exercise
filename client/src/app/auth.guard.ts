import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private jwtService: JwtHelperService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('access_token')) {
      let token: string = localStorage.getItem('access_token');
      if(this.jwtService.isTokenExpired(token)){
        return false;
      }
      return true;
    }
    let url: string = state.url;
    sessionStorage.setItem('redirectUrl', url);
    this.router.navigate(['login']);
    return false;
  }
}
