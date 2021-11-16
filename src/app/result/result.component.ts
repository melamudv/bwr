import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {getAllQuestions} from '../store/questions.reducers';
import {createUserName, createUserResults} from '../store/user.reducers';
import {Observable, Subscription} from 'rxjs';
import {IItem, IQuestion} from '../models/question.model';
import {IAnswer, IUser} from '../models/user.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit, OnDestroy {
  questions$: Observable<IItem[]>;
  user$: Observable<IUser>;
  answers$: Observable<IAnswer[]>;
  questionsSubscription: Subscription;
  userNameSubscription: Subscription;
  userResultsSubscription: Subscription;
  item: IItem[];
  name: string;
  answer: IAnswer[];
  countTrue: number = 0;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.questions$ = this.store.select(getAllQuestions);
    this.user$ = this.store.select(createUserName);
    this.answers$ = this.store.select(createUserResults);
    this.subscribeToQuestions();
    this.subscribeToUsers();
    this.subscribeUserResults();
    this.countCorrectAnswers();
  }
  countCorrectAnswers(): void{
    this.answer.forEach(el => {
      if (el.answer) { this.countTrue ++; }
    });
  }
  replaceText(text: string): string {
    return text.replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }
  subscribeToQuestions(): void{
    this.questionsSubscription = this.questions$.subscribe((item) => {
      this.item = item;
    });
  }

  subscribeToUsers(): void{
    this.userNameSubscription = this.user$.subscribe((user) => {
      this.name = user.name;
    });
  }
  subscribeUserResults(): void{
    this.userResultsSubscription = this.answers$.subscribe((answer) => {
      this.answer = answer;
    });
  }

  ngOnDestroy(): void{
    this.questionsSubscription.unsubscribe();
    this.userNameSubscription.unsubscribe();
    this.userResultsSubscription.unsubscribe();
  }
}
