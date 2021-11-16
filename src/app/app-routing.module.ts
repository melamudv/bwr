import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game/game.component';
import {ResultComponent} from './result/result.component';
import {CredentialComponent} from './credential/credential.component';
import {AuthGuardService as AuthGuard} from './core/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/credential', pathMatch: 'full' },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  { path: 'credential', component: CredentialComponent },
  { path: '**', redirectTo: 'credential'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
