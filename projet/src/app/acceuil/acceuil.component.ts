import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, model, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthService } from '../Service/auth.service';
import { Evenement } from '../M/Evenement';
import { Reservation } from '../Models/utilisateurmodel.component';
import { EventServiceService } from '../S/event-service.service';
import { ReservationService } from '../Service/reservation.service';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    MatDatepickerModule,
    MatCardModule,
    CommonModule,
    CanvasJSAngularChartsModule,
    SidebarComponent,
	RouterLink
],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {
	currentUser:any;
	event:Evenement[]=[];
	evenement:Evenement[]=[];
	res:Reservation[]=[];
	constructor(
		private authservice:AuthService,
		private eventservice: EventServiceService,
		private reservationservice:ReservationService,
	  ) {}
	ngOnInit(): void {
		this.authservice.getCurrentUser().subscribe({
		  next: (data) => {
			this.currentUser = data;
		  },
		  error: (err) => {
			console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
		  }
		});
		 this.getEventsNumber();
		 this.getReservations();
		// this.getEvents();
	  }
	  getEventsNumber() {
		this.eventservice.getEvents().subscribe((data) => {
		  this.event = data; // Assignez les données récupérées au tableau d'événements
		  console.log('Nombre d\'événements:', this.event.length); // Utilisez la propriété length pour obtenir le nombre d'événements
		  console.log('Events with Lieux:', this.event); // Utilisez la propriété length pour obtenir le nombre d'événements
		});
	  }
	  getEvents() {
		return this.eventservice.getEvents().subscribe((data) => {
		  this.evenement = data;
		  
           // Utilisez la propriété length pour obtenir le nombre d'événements
		});
	  }
	  
	  getReservations() {
		this.reservationservice.getAllReservation().subscribe((data) => {
		  this.res = data; // Assignez les données récupérées au tableau d'événements
		  console.log('Nombre de reservation:', this.res.length); // Utilisez la propriété length pour obtenir le nombre d'événements
		});
	  }
	  





  selected = model<Date | null>(null);

  dps = [{x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10},{x: 6, y: 10}, {x: 7, y: 13}];
	chart: any;
	
	chartOptions = {
	  exportEnabled: true,
	  title: {
		text: "Angular Dynamic Chart"
	  },
	  data: [{
		type: "line",
		dataPoints: this.dps
	  }]
	}
	getChartInstance(chart: object) {
		this.chart = chart;
		setTimeout(this.updateChart, 1000); //Chart updated every 1 second
	}
	updateChart = () => {
		var yVal = this.dps[this.dps.length - 1].y +  Math.round(5 + Math.random() *(-5-5));
		this.dps.push({x: this.dps[this.dps.length - 1].x + 1, y: yVal});
 
		if (this.dps.length >  10 ) {
			this.dps.shift();
		}
		this.chart.render();
		setTimeout(this.updateChart, 1000); //Chart updated every 1 second
	}		



}
