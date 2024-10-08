import { NgForOf, NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ReservationService } from '../Service/reservation.service';
import { Reservation } from '../Models/utilisateurmodel.component';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    SidebarComponent,
    RouterLink
],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent  implements OnInit{
   
  // reservationForm: FormGroup;
  reservation: Reservation[] = [];
  currentReservation: Reservation | undefined;
  currentUser:any;
  constructor(
    private reservationservice: ReservationService,
    private authservice: AuthService,
    private fb: FormBuilder
  ) {
    // this.reservationForm = this.fb.group({
    //   date_res: ['2024-07-29 09:18:28.000000', Validators.required],
    //   categories: [1, Validators.required],
    //   evenement_id: [1, [Validators.required, Validators.email]],
    //   methode_paiement_id: [1, Validators.required],
    //   statut_id: [1, Validators.required],
    //   utilisateur_id: [1, Validators.required]
    // });
  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe({
		  next: (data) => {
			this.currentUser = data;
		  },
		  error: (err) => {
			console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
		  }
		});
    this.getReservations();
  }


  getReservations(): void {
    this.reservationservice.getAllReservation().subscribe(
      (data: Reservation[]) => {
        this.reservation = data;
    
      },
      error => console.error(error)
    );
  }

  AnnulerRes(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Annuler la reservation!',
      cancelButtonText: 'Sortir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationservice.CancelReservation(id).subscribe(
          () => {
            this.reservation = this.reservation.filter(u => u.id !== id);
            Swal.fire(
              'Annulation reussi!',
              'La reservation a ete annuler.',
              'success'
            );
          },
          error => {
            console.error(error);
            Swal.fire(
              'Annulation reussi!',
              'La reservation a ete annuler.',
              'success'
            );
          }
        );
      }
    });
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
