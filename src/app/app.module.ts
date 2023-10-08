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
import { ResumeCreateComponent } from '@components/pages/resume/create.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ResumeTextStyleComponent } from '@components/pages/resume/text-style.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [AppComponent, ResumeCreateComponent, ResumeTextStyleComponent],
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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
