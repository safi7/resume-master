import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IndexRoutingModule } from './index-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ResumeLoginComponent from '@components/pages/auth/login.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ResumeLoginComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SharedModule,
  ],

  /**
   * ? HTTP_INTERCEPTORS is using onion model
   * * Request A
   * * Request B
   * * Request C
   *  ...
   * * Respond C
   * * Respond B
   * * Respond A
   **/
  providers: [
  ],
  bootstrap: []
})
export class AuthModule { }
