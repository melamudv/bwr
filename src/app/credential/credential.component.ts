import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {AddUser} from '../store/user.actions';
import {AppState} from '../app.state';


@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.less']
})
export class CredentialComponent implements OnInit {
  name = new FormControl('', [Validators.required,
    Validators.minLength(4)]);
  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {

  }

  start(): void {
    this.store.dispatch(new AddUser({name: this.name.value }));
    this.router.navigateByUrl('/game');
  }

}
