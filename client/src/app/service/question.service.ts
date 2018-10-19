import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question } from '../entity/question';
import { HttpClient } from '@angular/common/http';
import { HandleErrorService } from './handle-error.service';
import { environment } from '../../environments/environment';

const apiHost = environment.api_host;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  constructor(private http: HttpClient, private errorHandler: HandleErrorService) { }

  nextQuestion(bankid:number, last:number, onlyWrong:boolean, type?:string|null):Observable<Question>{
    var wrong = '0';
    if(onlyWrong){
      wrong = '1';
    }
    let url = `/question/next?bankId=${bankid}&last=${last}&wrong=${wrong}`;
    if(type){
      url = url + `&type=${type}`;
    }
    return this.http.get<Question>(apiHost + url).pipe(
      catchError(this.handleError<Question>())
    );
  }
  randomQuestion(bankid:number, onlyWrong:boolean, type?:string|null):Observable<Question>{
    var wrong = '0';
    if (onlyWrong) {
      wrong = '1';
    }
    let url = `/question/random?bankId=${bankid}&wrong=${wrong}`;
    if(type){
      url = url + `&type=${type}`;
    }
    return this.http.get<Question>(apiHost + url).pipe(
      catchError(this.handleError<Question>())
    );
  }
  getAnswer(questionId:number, answer:number[]):Observable<number[]>{
    return this.http.post<number[]>(apiHost + `/question/answer/${questionId}`, answer).pipe(
      catchError(this.handleError<number[]>([]))
    );
  }
  getQuestionsInPaper(paperId: number, type:string):Observable<Question[]>{
    return this.http.get<Question[]>(apiHost + `/question?paperId=${paperId}&type=${type}`).pipe(
      catchError(this.handleError<Question[]>([]))
    );
  }
  removeFromWrongCollection(questionId: number):Observable<any>{
    return this.http.delete<any>(apiHost + `/question/wrong/${questionId}`).pipe(
      catchError(this.handleError<any>())
    );
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errorHandler.openSnackBar(error.statusText);
      return of(result as T);
    };
  }
}
