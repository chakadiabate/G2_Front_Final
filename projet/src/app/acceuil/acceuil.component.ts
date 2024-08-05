import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SidebarComponent } from "../sidebar/sidebar.component";

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
export class AcceuilComponent {
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
