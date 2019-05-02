import { AuthGuardService } from './security/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

const routes: Routes = [
  { path: '', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuardService] },
  { path: 'review', loadChildren: './page/review/review.module#ReviewPageModule' , canActivate: [AuthGuardService] },
  { path: 'appointment', loadChildren: './page/appointments/appointments.module#AppointmentsPageModule' , canActivate: [AuthGuardService] },
  { path: 'construction', loadChildren: './page/construction/construction.module#ConstructionPageModule' , canActivate: [AuthGuardService] },
  { path: 'consultation', loadChildren: './page/consultation/consultation.module#ConsultationPageModule' , canActivate: [AuthGuardService] },
  { path: 'session', loadChildren: './page/session/session.module#SessionPageModule' , canActivate: [AuthGuardService]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
