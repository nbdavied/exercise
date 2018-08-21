import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../entity/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }
  getQuestion(method: string):Observable<Question>{
    this.http.get(`/api/question?method=${method}`).pipe(
      
    );
  }
}
