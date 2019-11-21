import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { UserService } from "../service/user.service";
import { JwtInterceptor, JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor{
    constructor(private userService: UserService, private jwtHelper: JwtHelperService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.endsWith('/auth/refresh')){
            return next.handle(req);
        }
        if(this.userService.loggedIn){
            if(new Date().getTime() - 
                (this.jwtHelper.getTokenExpirationDate().getTime() - 864000000) > 7200000){
                this.userService.refresh().subscribe(()=>{
                    return next.handle(req);
                })
            }
        }
        return next.handle(req);

    }
}
