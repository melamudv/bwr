import * as gameActions from './questions.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppAction} from '../app.action';
import {IQuestion} from '../models/question.model';

export interface State {
  data: IQuestion;
  load: boolean;
  action: string;
  error?: Error;
}

const initialState: State = {
  data: null,
  load: false,
  error: null,
  action: null
};

export function QuestionReducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * GET all games actions
     ************************/
    case gameActions.GET_QUESTIONS:
      return {
        ...state,
        action: gameActions.GET_QUESTIONS,
        load: true,
        error: null
      };
    case gameActions.GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        load: false,
        error: null
      };
    case gameActions.GET_QUESTIONS_ERROR:
      return {
        ...state,
        load: false,
        error: action.payload
      };
      }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const getQuestionsState = createFeatureSelector < State > ('questions');
export const getAllQuestions = createSelector(getQuestionsState, (state: State) => state?.data?.results);
export const getQuestionsError = createSelector(getQuestionsState, (state: State) => {
  return state.action === gameActions.GET_QUESTIONS
    ? state.error
   : null;
});

