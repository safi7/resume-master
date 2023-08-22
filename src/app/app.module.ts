import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SharedModule } from './modules/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './modules/core.module';
import { ErrorGlobalHandler } from './errors/global';
import { ManageHttpInterceptor } from './interceptors/manage-http.interceptor';
import { HttpCancelService } from '@services/http-cancel.service';
import { CredentialComponent } from '@components/pages/credetial/credential.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function tokenGetter() {
  // console.log('__tokenGetter', localStorage.getItem('jwt_token'));
  return localStorage.getItem('jwt_token');
}

@NgModule({
  declarations: [AppComponent, CredentialComponent,],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
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
    HttpCancelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManageHttpInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorGlobalHandler
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
