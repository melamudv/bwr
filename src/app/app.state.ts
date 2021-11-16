import * as fromQuestion from './store/questions.reducers';
import * as fromUser from './store/user.reducers';

export interface AppState {
  question: fromQuestion.State;
  user: fromUser.State;
}
