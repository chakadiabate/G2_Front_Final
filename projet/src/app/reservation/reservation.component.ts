import { NgForOf, NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { SidebarComponent } from "../sidebar/sidebar.component";


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    SidebarComponent
],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit {
  public lstadmin:any
  constructor(public http : HttpClient, private userService : UtilisateurServiceService) {}
  public admin = {
    "id" : 0,
    "email": "",
    "mot_de_passe": "",
    "nom" : "",
    "prenom" : "",
    "telephone":0,
    "role_id":1
  }

  ngOnInit(){
    
  }
  
 

   visible = false;
   visibleSup = false;

  afficher(){
    this.visible=true;
  }
  cacher() {
    this.visible=false;
  }
  afficherSup(){
    this.visibleSup=true;
  }
  cacherSup() {
    this.visibleSup=false;
  }
 
}
