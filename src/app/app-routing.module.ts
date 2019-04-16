import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
	{ path: "auth/login", component: LoginComponent },
	{ path: "auth/register", component: RegisterComponent },
	{
		path: "",
		loadChildren: "./modules/ingreso-egreso.module#IngresoEgresoModule",
		canLoad: [AuthGuard]
	},
	{ path: "**", redirectTo: "" }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
