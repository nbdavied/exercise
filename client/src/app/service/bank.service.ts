import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../entity/bank';
import { QuesNum } from '../module/paper/ques-num';
import { HandleErrorService } from './handle-error.service';
import { environment } from '../../environments/environment';

const apiHost = environment.api_host;
@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient, private errorHandler: HandleErrorService) { }
  getBanks():Observable<Bank[]>{
    return this.http.get<Bank[]>(apiHost + '/api/banks').pipe(
      catchError(this.handleError<Bank[]>([]))
    );
  }
  getQuesNum(bankId:number):Observable<QuesNum>{
    return this.http.get<QuesNum>(apiHost + `/api/bank/count/${bankId}`).pipe(
      catchError(this.handleError<QuesNum>({"snum":0,"mnum":0,"tnum":0}))
    );
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errorHandler.openSnackBar(error.statusText);
      return of(result as T);
    };
  }

}
