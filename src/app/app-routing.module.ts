import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeCreateComponent } from '@components/pages/resume/create.component';
import { ResumeListComponent } from '@components/pages/resume/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/resume', pathMatch: 'full' },
  {
    path: 'resume',
    children: [
      { path: '', component: ResumeListComponent, pathMatch: 'full' },
      { path: ':id/create', component: ResumeCreateComponent, pathMatch: 'full' },
    ]
  }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
