import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {CoreModule} from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Carousel, CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import { GameComponent } from './game/game.component';
import { ResultComponent } from './result/result.component';
import { CredentialComponent } from './credential/credential.component';
import {RippleModule} from 'primeng/ripple';
import {QuestionEffects} from './store/questions.effects';
import * as questionReducer from './store/questions.reducers';
import * as userReducer from './store/user.reducers';
import {UserEffects} from './store/user.effects';
import {TooltipModule} from 'primeng/tooltip';
import {ProgressBarModule} from 'primeng/progressbar';
import { CarouselComponent } from './carousel/carousel.component';
import {ToastModule} from 'primeng/toast';
export const reducers: ActionReducerMap<any> = {
  questions: questionReducer.QuestionReducer,
  user: userReducer.UserReducer
};

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResultComponent,
    CredentialComponent,
    CarouselComponent
  ],
  imports: [
    FormsModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([QuestionEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    CarouselModule,
    ButtonModule,
    RippleModule,
    TooltipModule,
    ToastModule,
    ProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
