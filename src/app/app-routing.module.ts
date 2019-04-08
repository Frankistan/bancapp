import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [
  { path: "auth/login", component: LoginComponent},
  { path: "auth/register", component: RegisterComponent},
  { path: "", component: DashboardComponent, children: dashboardRoutes},
  { path: "**", redirectTo: ""}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
