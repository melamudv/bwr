import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import {AuthGuardService} from './auth-guard.service';
import {ReplacePipe} from './pipes/replace.pipe';

@NgModule({
  imports: [],
  declarations: [ReplacePipe],
  exports: [
    ReplacePipe
  ],
  providers: [DataService, AuthGuardService]
})
export class CoreModule { }
