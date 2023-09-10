import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeCreateComponent } from '@components/pages/resume/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/resume/create', pathMatch: 'full' },
  {
    path: 'resume/create',
    children: [
      { path: '', component: ResumeCreateComponent, pathMatch: 'full' },
    ]
  }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
