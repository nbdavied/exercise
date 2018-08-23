import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question } from '../entity/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }
  getQuestion(bankid:number, method: string):Observable<Question>{
    return this.http.get<Question>(`/api/question/${bankid}?method=${method}`).pipe(
      catchError(this.handleError<Question>('getQuestion'))
    );
  }
  getAnswer(questionId:number, answer:number[]):Observable<number[]>{
    return this.http.post<number[]>(`/api/answer/${questionId}`, answer).pipe(
      catchError(this.handleError<number[]>('getAnswer',[]))
    );
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
  private log(msg: string):void{

  }
}
