import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IItem} from '../models/question.model';
import {Store} from '@ngrx/store';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Carousel} from 'primeng/carousel';
import {GetAllQuestions} from '../store/questions.actions';
import {getAllQuestions} from '../store/questions.reducers';
import {AppState} from '../app.state';
import {AddAnswerUser} from '../store/user.actions';
import {Router} from '@angular/router';
import {createUserName, createUserResults} from '../store/user.reducers';
import {IAnswer, IUser} from '../models/user.model';
import {MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
  providers: [MessageService]
})
export class GameComponent implements OnInit, OnDestroy {
  questions$: Observable<IItem[]>;
  user$: Observable<IUser>;
  answers$: Observable<IAnswer[]>;
  userSubscription: Subscription;
  user: string = '';
  answersSubscription: Subscription;
  answersLength;
  constructor(private store: Store<AppState>, private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.store.dispatch(new GetAllQuestions());
    this.questions$ = this.store.select(getAllQuestions);
    this.user$ = this.store.select(createUserName);
    this.answers$ = this.store.select(createUserResults);
    this.subscribeUserName();
    this.subscribeAnswers();
  }

  subscribeUserName(): void{
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user.name;
    });
  }
  subscribeAnswers(): void{
    this.answersSubscription = this.answers$.subscribe((answers) => {
      this.answersLength = answers.length;
    });
  }
  addAnswer($event: IAnswer): void{
    this.store.dispatch(new AddAnswerUser( $event ));
  }
  onToast($event: boolean): void{
    this.messageService.add({key: 'bc', severity: 'info', summary: 'Info', detail: 'Answer right not from first attempts'});
  }

  ngOnDestroy(): void{
    this.userSubscription.unsubscribe();
    this.answersSubscription.unsubscribe();
  }
}
