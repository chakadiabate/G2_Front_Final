import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { EvenementComponent } from "./evenement/evenement.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CorpsComponent } from "./corps/corps.component";
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AcceuilComponent } from "./acceuil/acceuil.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    CorpsComponent,
    RouterModule
    // RouterLink,
    // RouterLinkActive,
    ,
    EvenementComponent,
    LoginComponent,
    AcceuilComponent
],



  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projet';
}
