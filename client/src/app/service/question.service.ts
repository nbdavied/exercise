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

  nextQuestion(bankid:number, last:number, onlyWrong:boolean):Observable<Question>{
    var wrong = '0';
    if(onlyWrong){
      wrong = '1';
    }
    return this.http.get<Question>(`/api/question/next?bankId=${bankid}&last=${last}&wrong=${wrong}`).pipe(
      catchError(this.handleError<Question>('nextQuestion'))
    );
  }
  randomQuestion(bankid:number, onlyWrong:boolean):Observable<Question>{
    var wrong = '0';
    if (onlyWrong) {
      wrong = '1';
    }
    return this.http.get<Question>(`/api/question/random?bankId=${bankid}&wrong=${wrong}`).pipe(
      catchError(this.handleError<Question>('nextQuestion'))
    );
  }
  getAnswer(questionId:number, answer:number[]):Observable<number[]>{
    return this.http.post<number[]>(`/api/question/answer/${questionId}`, answer).pipe(
      catchError(this.handleError<number[]>('getAnswer',[]))
    );
  }
  getQuestionsInPaper(paperId: number, type:string):Observable<Question[]>{
    return this.http.get<Question[]>(`/api/question?paperId=${paperId}&type=${type}`);
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
