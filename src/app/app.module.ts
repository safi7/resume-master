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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name: 'sample_login'
};

@NgModule({
  declarations: [AppComponent],
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
    SocialLoginModule,
    QuillModule.forRoot(),
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
    {
      provide: ErrorHandler,
      useClass: ErrorGlobalHandler
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '931591053095-ukm25ltv6sjgdq2j3tmjl0hmhtq6qmif.apps.googleusercontent.com',
              googleLoginOptions
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '814221563686589',
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
