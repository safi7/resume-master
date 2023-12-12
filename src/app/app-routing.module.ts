import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayutComponent } from '@components/layouts/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/resume', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/index.module').then(m => m.AuthModule)
  },
  {
    path: 'resume',
    component: MainLayutComponent,
    loadChildren: () =>
      import('./modules/resume/index.module').then(m => m.ResumeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
