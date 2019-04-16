import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { ChartsModule } from 'ng2-charts';
import { CustomFirebaseModule } from './custom-firebase.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { OrdenarPipe } from '../ingreso-egreso/ordenar.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenarPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    // CustomFirebaseModule,
  ]
})
export class IngresoEgresoModule { }
