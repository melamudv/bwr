import {Action} from '@ngrx/store';
import {IQuestion} from '../models/question.model';

export const GET_QUESTIONS = '[ALL] Questions';
export const GET_QUESTIONS_SUCCESS = '[ALL] Questions Success';
export const GET_QUESTIONS_ERROR = '[ALL] Questions Error';


/****************************************
 * GET all the games
 ****************************************/
export class GetAllQuestions implements Action {
  readonly type = GET_QUESTIONS;
}

export class GetAllQuestionsSuccess implements Action {
  readonly type = GET_QUESTIONS_SUCCESS;

  constructor(public payload: IQuestion) {
  }
}

export class GetAllQuestionsError implements Action {
  readonly type = GET_QUESTIONS_ERROR;

  constructor(public payload: Error) {
  }
}

