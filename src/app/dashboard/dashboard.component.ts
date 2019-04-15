import { Component, OnInit } from '@angular/core';
import { MovementsService } from '../services/movements.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private movSVC: MovementsService) { }

  ngOnInit() {
    this.movSVC.initMovementService();
  }

}
