import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayutComponent } from '@components/layouts/main.component';
import { ResumeCreateComponent } from '@components/pages/resume/create.component';
import { ResumeListComponent } from '@components/pages/resume/list.component';

const routes: Routes = [
  { path: '', redirectTo: '/resume', pathMatch: 'full' },
  {
    path: 'resume',
    component: MainLayutComponent,
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
