import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeCreateComponent } from '@components/pages/resume/create.component';
import { ResumeListComponent } from '@components/pages/resume/list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ResumeListComponent, pathMatch: 'full' },
  { path: 'list', component: ResumeListComponent, pathMatch: 'full' },
  { path: ':id/create', component: ResumeCreateComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
