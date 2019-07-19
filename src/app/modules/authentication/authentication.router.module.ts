import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../authentication/pages/login/login.module#LoginPageModule'
          }
        ]
      },

      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: '../authentication/pages/register/register.module#RegisterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full'
      }
    ],
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationPageRoutingModule {}
