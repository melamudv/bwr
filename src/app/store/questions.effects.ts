import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as questionsActions from './questions.actions';
import {GetAllQuestionsError, GetAllQuestionsSuccess} from './questions.actions';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, switchMap} from 'rxjs/operators';
import {DataService} from '../core/data.service';
import {IItem} from '../models/question.model';

@Injectable()
export class QuestionEffects {
  constructor(private actions$: Actions,
              private dataService: DataService) {
  }

  @Effect()
  getAllQuestions$: Observable<Action> = this.actions$.pipe(
    ofType(questionsActions.GET_QUESTIONS),
    switchMap(() => this.dataService.getQuestions()),
    map(questions => new GetAllQuestionsSuccess(this.sortByDifficulty(this.addAllAnswers(questions)))),
    catchError((err) => [new GetAllQuestionsError(err)])
  );
  addAllAnswers(data){
    let allAnswers = [];
    const returnObj: IItem[] = [];
    data.results.map((el: IItem, index) => {
      allAnswers = [];
      el.incorrect_answers.map(answerText => {
        allAnswers.push({ answer: answerText });
      });
      allAnswers.push({ answer: el.correct_answer });
      returnObj.push({...el, all_answers: allAnswers});
    });
    return {results: returnObj, response_code: 0};
  }
  sortByDifficulty(data){
    data.results.sort( function( a , b){
      if(a.difficulty === 'hard') return 1;
      if(b.difficulty === 'easy') return 0;
      return -1;
    });
    return data;
  }
}
