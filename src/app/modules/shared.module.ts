import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageComponent } from '@components/shared/message/index.component';
import { SimpleModalComponent } from '@components/shared/modal/simple-modal.component';
import { SimplePanelComponent } from '@components/shared/expandable-panel/simple-panel.component';
import { PopupContentDirective } from '../directives/popup-content.directive';
import { ExpandableContentDirective } from '../directives/expandable-content.directive';
import { DigitOnlyDirective } from '../directives/digit-only.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    SimpleModalComponent,
    SimplePanelComponent,
    MessageComponent,
    PopupContentDirective,
    ExpandableContentDirective,
    DigitOnlyDirective,
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
    SimplePanelComponent,
    MessageComponent,
    PopupContentDirective,
    ExpandableContentDirective,
    DigitOnlyDirective,
    NgxSliderModule,
    LazyLoadImageModule,
  ],
  providers: [],
})
export class SharedModule { }
