import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as userActions from './user.actions';
import {AddAnswerError, AddAnswerSuccess, AddAnswerUser, AddUser, AddUserError, AddUserSuccess} from './user.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {DataService} from '../core/data.service';

;

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  @Effect()
  createUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.CREATE_USER),
    map((action: AddUser) => action.payload),
    switchMap((name) => this.dataService.addUser(name)),
    map(user => new AddUserSuccess( user.name )),
    catchError((err) => [new AddUserError(err)])
  );

  @Effect()
  createAnswer$ = this.actions$.pipe(
    ofType(userActions.CREATE_USER_ANSWER),
    map((action: AddAnswerUser) => action.payload),
    switchMap(newAnswer => this.dataService.addAnswer(newAnswer)),
    map((answer) => new AddAnswerSuccess(answer)),
    catchError((err) => [new AddAnswerError(err)])
  );

}
