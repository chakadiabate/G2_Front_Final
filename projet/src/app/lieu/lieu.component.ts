import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from "@angular/common";

import { HttpClient } from "@angular/common/http";
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Lieu } from '../Models/utilisateurmodel.component';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
import { LieuService } from '../Service/lieu.service';

@Component({
  selector: 'app-lieu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    NgxPaginationModule
  ],
  templateUrl: './lieu.component.html',
  styleUrl: './lieu.component.css'
})
export class LieuComponent implements OnInit {
  lieuForm: FormGroup;
  Lieux: Lieu[] = [];
  filteredLieu: Lieu[] = [];
  isEditing = false;
  currentLieuId: number | null = null;
  searchText = '';
  currentUser:any;
  // Pagination properties
  p: number = 1; // Current page
  itemsPerPage: number = 5; // Number of items per page

  constructor(
    private lieuservice: LieuService,
    private authservice: AuthService,
    private fb: FormBuilder
  ) {
    this.lieuForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      salle: ['', Validators.required],
      capacite: ['', Validators.required]
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
    this.getAllLieu();
  }

  getAllLieu(): void {
    this.lieuservice.getAllLieu().subscribe(
      (data: Lieu[]) => {
        this.Lieux = data;
        this.filteredLieu = data; // Initialize filteredLieu with all lieux
      },
      error => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.isEditing && this.currentLieuId !== null) {
      this.updateLieu();
    } else {
      const newLieu: Lieu = this.lieuForm.value;
      this.addLieu(newLieu);
    }
  }

  addLieu(newLieu: Lieu): void {
    this.lieuservice.createLieu(newLieu).subscribe(
      data => {
        this.Lieux.push(data);
        this.filteredLieu.push(data); // Add to the filtered list as well
        this.lieuForm.reset();
      },
      error => console.error(error)
    );
  }

  editLieu(lieu: Lieu): void {
    this.isEditing = true;
    this.currentLieuId = lieu.id !== undefined ? lieu.id : null;
    this.lieuForm.patchValue({
      ...lieu
    });
  }

  updateLieu(): void {
    if (this.currentLieuId !== null) {
      console.log('id courant',this.currentLieuId);
      const lieuUpdate: Lieu = this.lieuForm.value;
      this.lieuservice.updateLieu(this.currentLieuId, lieuUpdate).subscribe(
        data => {
          const index = this.Lieux.findIndex(l => l.id === this.currentLieuId);
          if (index !== -1) {
            this.Lieux[index] = data;
            this.filteredLieu[index] = data; // Update the filtered list as well
          }
          this.lieuForm.reset();
          this.isEditing = false;
          this.currentLieuId = null;
        },
        error => console.error(error)
      );
    }
  }

  deleteLieu(id: number): void {

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lieuservice.deleteLieu(id).subscribe(
          () => {
            this.Lieux = this.Lieux.filter(u => u.id !== id);
            Swal.fire(
              'Supprimé!',
              'Le lieu a été supprimé.',
              'success'
            );
          },
          error => {
            console.error(error);
            Swal.fire(
              'Supprimer avec succes!',
              'Le lieu a été supprimé.',
              'success'
            );
          }
        );
      }
    });

  }

  filterLieu(): void {
    this.filteredLieu = this.Lieux.filter(lieu =>
      lieu.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      lieu.adresse.toLowerCase().includes(this.searchText.toLowerCase()) ||
      lieu.salle.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.p = 1; // Reset to first page on filter change
  }

  // Logic for displaying popups
  visible = false;
  visibleSup = false;
  visibleEq = false;

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
 afficherEq(){
   this.visibleEq=true;
 }
 cacherEq() {
   this.visibleEq=false;
 }

}