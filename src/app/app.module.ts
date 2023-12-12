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
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { environment } from '@env/environment';

export function tokenGetter() {
  console.log('__tokenGetter', localStorage.getItem('jwt_token'));
  return localStorage.getItem('jwt_token');
}

export function jwtOptionsFactory(options) {
  let allowedDomains = options.allowedDomains || [];

  function addAllowedDomains(domain) {
    allowedDomains = [...allowedDomains, domain];
  }

  return {
    addAllowedDomains,
    options: () => ({
      ...options,
      allowedDomains: allowedDomains,
    }),
  };
}

export const jwtOptions = jwtOptionsFactory({
  tokenGetter,
  skipWhenExpired: true,
  headerName: 'Authorization',
  allowedDomains: [
    'api-local.sportsinformations.com',
    'api.sportsinformations.com',
  ],
  disallowedRoutes: []
});


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
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptions.options
      }
    })
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
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_key,
              googleLoginOptions
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              environment.facebook_key,
            )
          }
        ]
      } as SocialAuthServiceConfig
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


