import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IQuestion} from '../models/question.model';
import {Observable} from 'rxjs';
import {IAnswer} from '../models/user.model';



@Injectable()
export class DataService {

  baseUrl: string = 'https://opentdb.com/api.php?amount=20&amp;encode=base64&amp;type=multiple';

  constructor(private http: HttpClient) { }

  getQuestions(){
    return this.http.get<IQuestion>(`${this.baseUrl}`);
  }
  addUser(userName): Observable<any> {
    return userName;
  }
  addAnswer(answer): Observable<IAnswer> {
    return answer;
  }
}
