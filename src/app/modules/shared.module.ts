import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageComponent } from '@components/shared/message/index.component';
import { SimpleModalComponent } from '@components/shared/modal/simple-modal.component';
import { PopupContentDirective } from '../directives/popup-content.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SampleBaseComponent } from '../components/shared/samples/base.component';
import {
  Sample01Component,
  Sample02Component,
  Sample03Component,
  Sample04Component,
  Sample05Component,
  Sample06Component,
  Sample07Component,
  Sample08Component,
  Sample09Component,
  Sample10Component,

} from '@components/shared/samples/index.component';
import { MainLayutComponent } from '@components/layouts/main.component';

@NgModule({
  declarations: [
    SimpleModalComponent,
    MessageComponent,
    MainLayutComponent,
    PopupContentDirective,
    SampleBaseComponent,
    Sample01Component,
    Sample02Component,
    Sample03Component,
    Sample04Component,
    Sample05Component,
    Sample06Component,
    Sample07Component,
    Sample08Component,
    Sample09Component,
    Sample10Component,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgbModule,
    LazyLoadImageModule,
  ],
  exports: [
    SimpleModalComponent,
    MessageComponent,
    MainLayutComponent,
    PopupContentDirective,
    NgxSliderModule,
    LazyLoadImageModule,
    SampleBaseComponent,
    Sample01Component,
    Sample02Component,
    Sample03Component,
    Sample04Component,
    Sample05Component,
    Sample06Component,
    Sample07Component,
    Sample08Component,
    Sample09Component,
    Sample10Component,
  ],
  providers: [],
})
export class SharedModule { }
