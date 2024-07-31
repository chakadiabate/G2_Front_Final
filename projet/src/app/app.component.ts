import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EvenementComponent } from "./evenement/evenement.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EvenementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projet';
}
