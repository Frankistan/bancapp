import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Movimiento } from 'src/app/models/movimiento';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
	selector: 'app-estadistica',
	templateUrl: './estadistica.component.html',
	styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

	ingresos: number = 0;
	egresos: number = 0;
	totalIngresos: number = 0;
	totalEgresos: number = 0;
	destroy = new Subject<any>();
	movements: Movimiento[];

	public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
	public doughnutChartData: MultiDataSet = [];
	public doughnutChartType: ChartType = 'doughnut';

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.store.select('movements')
			.pipe(takeUntil(this.destroy))
			.subscribe(state => {
				this.movements = state.movements;
				this.contador(state.movements);
			})
	}

	contador(items: Movimiento[]) {
		items.forEach((movimiento, index) => {
			if (movimiento.type === "ingreso") {
				this.ingresos++;
				this.totalIngresos += movimiento.amount;
			} else {
				this.egresos++;
				this.totalEgresos += movimiento.amount;
			}
		});

		this.doughnutChartData = [[this.totalIngresos,this.totalEgresos]];
	}

	ngOnDestroy(): void {
		this.destroy.next();
	}
}
