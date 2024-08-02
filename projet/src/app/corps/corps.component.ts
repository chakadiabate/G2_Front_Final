import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-corps',
  standalone: true,
  imports: [NavbarComponent, NavbarComponent, SidebarComponent,RouterOutlet,RouterModule],
  templateUrl: './corps.component.html',
  styleUrl: './corps.component.css',
})
export class CorpsComponent {}
