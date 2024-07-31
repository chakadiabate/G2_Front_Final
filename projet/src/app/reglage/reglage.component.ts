import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../Models/utilisateurmodel.component';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import Swal from 'sweetalert2';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-reglage',
  standalone: true,
  imports: 
  [
    RouterOutlet,
    RouterLink,
    NgIf,
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './reglage.component.html',
  styleUrl: './reglage.component.css'
})
export class ReglageComponent implements OnInit{
  profileForm: FormGroup;
  currentUser: Utilisateur | undefined;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurServiceService,
    private authservice: AuthService
  ) {
    this.profileForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required],
    });
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
    this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        this.profileForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.telephone,
          motDePasse: data.motDePasse,
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      const updatedUser: Utilisateur = {
        ...this.currentUser,
        ...this.profileForm.value
      };
      this.utilisateurService.updateProfile(updatedUser).subscribe({
        next: (response) => {
          console.log('Profile updated successfully', response);
          Swal.fire('Succès', 'Profil mis à jour avec succès', 'success');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du profil', err);
          Swal.fire('Erreur', 'Erreur lors de la mise à jour du profil', 'error');
        }
      });
    }
  }
}
