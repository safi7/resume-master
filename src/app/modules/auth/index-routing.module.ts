import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import ResumeLoginComponent from '@components/pages/auth/login.component';

const routes: Routes = [
  { path: '', component: ResumeLoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
