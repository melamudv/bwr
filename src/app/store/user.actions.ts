import {Action} from '@ngrx/store';
import {IAnswer, IUser} from '../models/user.model';

export const  CREATE_USER = '[CREATE] User';
export const CREATE_USER_SUCCESS = '[CREATE] User Create Success';
export const CREATE_USER_ERROR = '[CREATE] User Create Error';


export const CREATE_USER_ANSWER = '[ANSWER] User Answer';
export const CREATE_USER_ANSWER_SUCCESS = '[ANSWER] User Answer Create Success';
export const CREATE_USER_ANSWER_ERROR = '[ANSWER] User Answer Create Error';


/****************************************
 * ADD user
 ****************************************/
export class AddUser implements Action {
  readonly type = CREATE_USER;

  constructor(public payload: IUser) {
  }
}

export class AddUserSuccess implements Action {
  readonly type = CREATE_USER_SUCCESS;

  constructor(public payload: IUser) {
  }
}

export class AddUserError implements Action {
  readonly type = CREATE_USER_ERROR;

  constructor(public payload: Error) {
  }
}

/****************************************
 * ADD user answer
 ****************************************/
export class AddAnswerUser implements Action {
  readonly type = CREATE_USER_ANSWER;

  constructor(public payload: IAnswer) {
  }
}

export class AddAnswerSuccess implements Action {
  readonly type = CREATE_USER_ANSWER_SUCCESS;

  constructor(public payload: IAnswer) {
  }
}

export class AddAnswerError implements Action {
  readonly type = CREATE_USER_ANSWER_ERROR;

  constructor(public payload: Error) {
  }
}

