import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IndexRoutingModule } from './index-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeCreateComponent } from '@components/pages/resume/create.component';
import { ResumeTextStyleComponent } from '@components/pages/resume/text-style.component';
import { ResumeListComponent } from '@components/pages/resume/list.component';
import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ResumeCreateComponent, ResumeTextStyleComponent, ResumeListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IndexRoutingModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    SharedModule,
  ],

  providers: [
  ],
  bootstrap: []
})
export class ResumeModule { }
