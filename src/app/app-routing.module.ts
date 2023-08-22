import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CredentialComponent } from '@components/pages/credetial/credential.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    children: [
      { path: '', component: CredentialComponent, pathMatch: 'full' },
    ]
  }
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
