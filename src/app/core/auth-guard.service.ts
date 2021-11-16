import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IUser} from '../models/user.model';
import {AppState} from '../app.state';
import {createUserName} from '../store/user.reducers';
@Injectable()
export class AuthGuardService implements CanActivate {
  userName$: Observable<IUser>;
  user = null;
  constructor(public router: Router, private store: Store<AppState>) {}
  canActivate(): boolean {
    this.userName$ = this.store.select(createUserName);
    this.userName$.subscribe(user => {
      this.user = user?.name ? user.name : null;
    });
    if (this.user === null) {
      this.router.navigate(['credential']);
      return false;
    }
    return true;
  }
}
