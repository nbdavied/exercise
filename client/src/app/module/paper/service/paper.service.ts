import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestPaper } from '../entity/test-paper';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaperService {

  constructor(private http:HttpClient) { }

  createPaper(paper: TestPaper):Observable<any>{
    return this.http.post<any>('/api/paper',paper);
  }
  getPapers():Observable<TestPaper[]>{
    return this.http.get<TestPaper[]>('/api/paper');
  }
}
