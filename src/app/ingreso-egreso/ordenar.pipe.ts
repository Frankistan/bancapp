import { Pipe, PipeTransform } from '@angular/core';
import { Movimiento } from '../models/movimiento';

@Pipe({
	name: 'ordenar'
})
export class OrdenarPipe implements PipeTransform {

	transform(value: Movimiento[], args?: any): Movimiento[] {

		return value.sort((a, b) => {
			if (a.type == 'ingreso') {
				return -1;
			} else {
				return 1;
			}
		});
	}

}
