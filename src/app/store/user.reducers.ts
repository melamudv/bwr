import * as userActions from './user.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppAction} from '../app.action';
import {IAnswer, IUser} from '../models/user.model';

export interface State {
  name: IUser;
  selected: IAnswer[];
  action: string;
  error?: Error;
}

const initialState: State = {
  name: null,
  selected: [],
  error: null,
  action: null
};

export function UserReducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
      /*************************
     * CREATE user actions
     ************************/
    case userActions.CREATE_USER:
      return {
        ...state,
        action: userActions.CREATE_USER,
        name: action.payload,
        error: null
      };
    case userActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        name: null
      };
    case userActions.CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    /*************************
     * CREATE user answer
     ************************/
    case userActions.CREATE_USER_ANSWER:
      return {
        ...state,
        selected: [...state.selected, action.payload],
        action: userActions.CREATE_USER_ANSWER,
        error: null
      };
    case userActions.CREATE_USER_ANSWER_SUCCESS:
    {
      return { ...state, selected: action.payload };
    }
    case userActions.CREATE_USER_ANSWER_ERROR:
      return {
        ...state,
        error: action.payload
      };

  }
  return state;
}

/*************************
 * SELECTORS
 ************************/
export const createUserState = createFeatureSelector < State > ('user');
export const createUserName = createSelector(createUserState, (state: State) => state.name);
export const createUserResults = createSelector(createUserState, (state: State) => state.selected);
export const createUserError = createSelector(createUserState, (state: State) => {
  return state.action === userActions.CREATE_USER
    ? state.error
   : null;
});

