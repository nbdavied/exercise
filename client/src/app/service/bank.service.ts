import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../entity/bank';
import { QuesNum } from '../paper/ques-num';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }
  getBanks():Observable<Bank[]>{
    return this.http.get<Bank[]>('api/banks').pipe(
      catchError(this.handleError<Bank[]>('get banks',[]))
    );
  }
  getQuesNum(bankId:number):Observable<QuesNum>{
    return this.http.get<QuesNum>(`api/bank/count/${bankId}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(msg: string): void {

  }
}
