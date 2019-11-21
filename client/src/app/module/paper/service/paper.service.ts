import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestPaper } from '../entity/test-paper';
import { Observable, of } from 'rxjs';
import { PaperQuestion } from '../entity/paper-question';
import { HandleErrorService } from '../../../service/handle-error.service';
import { catchError } from 'rxjs/operators';
import { TestResult } from '../entity/test-result';
import { Question } from '../../../entity/question';
import { environment } from '../../../../environments/environment';

const apiHost = environment.api_host;
@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private http:HttpClient, private errorHandler: HandleErrorService) { }

  createPaper(paper: TestPaper):Observable<any>{
    return this.http.post<any>(apiHost + '/paper',paper).pipe(
      catchError(this.handleError<any>())
    );
  }
  getPapers():Observable<TestPaper[]>{
    return this.http.get<TestPaper[]>(apiHost + '/paper').pipe(
      catchError(this.handleError<TestPaper[]>([]))
    );
  }
  saveSelected(q: PaperQuestion):Observable<any>{
    return this.http.post<any>(apiHost + '/paper/select', q).pipe(
      catchError(this.handleError<any>())
    );
  }
  finishPaper(paperId: number):Observable<number>{
    return this.http.post<number>(apiHost + '/paper/finish', {"id":paperId});

  }
  startPaper(paperId: number):Observable<TestPaper>{
    return this.http.post<TestPaper>(apiHost + '/paper/start', {"id":paperId});
  }
  updateRestTime(paperId: number, restTime:number):Observable<any>{
    return this.http.post<any>(apiHost + '/paper/time', {"id":paperId, "restTime":restTime}).pipe(
      catchError(this.handleError<any>())
    );
  }
  getResults(paperId:number):Observable<TestResult[]>{
    return this.http.get<TestResult[]>(apiHost + `/paper/result?paperId=${paperId}`).pipe(
      catchError(this.handleError<TestResult[]>([]))
    );
  }
  getResultDetail(resultId:number,type:string, onlyWrong:boolean):Observable<Question[]>{
    return this.http.get<Question[]>(apiHost + `/paper/detail/${resultId}?type=${type}&onlywrong=${onlyWrong}`).pipe(
      catchError(this.handleError<Question[]>([]))
    );
  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      this.errorHandler.openSnackBar(error.statusText);
      return of(result as T);
    };
  }
}
