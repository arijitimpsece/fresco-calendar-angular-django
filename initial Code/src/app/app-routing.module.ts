import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouteValidationGuard } from './routeValidation/route-validation.guard';


const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteValidationGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
