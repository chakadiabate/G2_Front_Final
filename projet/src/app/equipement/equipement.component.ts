import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipementService } from '../Service/equipement.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { PrestateurService } from '../Service/prestateur.service';
import { Equipement, Prestateur } from '../Models/utilisateurmodel.component';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-equipement',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterOutlet,
    RouterLink,
    SidebarComponent,
    ReactiveFormsModule
],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.css'
})
export class EquipementComponent implements OnInit {
  EquipementForm: FormGroup;
  equipement: Equipement[]=[];
  prestateurs : Prestateur[] = [];
  isEditing = false;
  currentEquiId: number | null = null;
  currentUser:any;
  constructor(
    public http : HttpClient, 
    private equipementervice : EquipementService,
    private prestaservice:PrestateurService,
    private authservice:AuthService,
    private champ: FormBuilder
  ) 
  {
    this.EquipementForm = this.champ.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      presta: ['', Validators.required]
    })

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
    this.getAllEquipements();
    this.getAllPrest();
}
getAllPrest(){
  this.prestaservice.getAllPrestateurs().subscribe(
    (data: Prestateur[])=>{
      console.log('vous êtes dans Prestateur:', data);
      this.prestateurs = data;
    },
    error =>{
      console.error('erreur Prestateur:', error)
    }
  )
}

getAllEquipements(){
  this.equipementervice.getAllEquipement().subscribe(
    (data: Equipement[])=>{
      console.log('vous êtes dans Equipement:', data);
      this.equipement = data;
    },
    error =>{
      console.error('erreur RolePrestateur:', error)
    }
  )
}



onSubmit(): void {
   
  if (this.isEditing && this.currentEquiId !== null) {
      this.updateEquipement();
    } else {
  const newEquipement: Equipement = this.EquipementForm.value;
  newEquipement.presta = { id: this.EquipementForm.value.presta } as Prestateur; 
  console.log(newEquipement.presta);

  this.addEquipement(newEquipement);
  } 
  
}

addEquipement(newEquipemet: Equipement): void {
  this.equipementervice.createEquipement(newEquipemet).subscribe(
    data => {
      this.equipement.push(data);
      this.EquipementForm.reset();
    },
    error => {
      console.error('Erreur lors de la création de l equipement:', error);
      // Afficher des messages d'erreur pour l'utilisateur
    }
  );
}


editEquipement(equi: Equipement): void {
  this.isEditing = true;
  this.currentEquiId = equi.id !== undefined ? equi.id : null;
  this.EquipementForm.patchValue({
    ...equi
  });
}
//methode pour la mise a jour
updateEquipement(): void {
  if (this.currentEquiId !== null) {
    console.log('id courant',this.currentEquiId);
    const EquipementUpdate: Equipement = this.EquipementForm.value;
    EquipementUpdate.presta = { id: this.EquipementForm.value.presta } as Prestateur; 
    console.log(EquipementUpdate);
    this.equipementervice.updateEquipement(this.currentEquiId, EquipementUpdate).subscribe(
      data => {
        const index = this.equipement.findIndex(e => e.id === this.currentEquiId);
        if (index !== -1) {
          this.equipement[index] = data;
          //this.filteredLieu[index] = data; // Update the filtered list as well
        }
        this.EquipementForm.reset();
        this.isEditing = false;
        this.currentEquiId = null;
      },
      error => console.error(error)
    );
  }
}

deleteEquipement(id: number): void {
  this.equipementervice.deleteEquipement(id).subscribe(
    () => {
      this.equipement = this.equipement.filter(e => e.id !== id);
      //this.filteredLieu = this.filteredLieu.filter(l => l.id !== id); // Update the filtered list as well
    },
    error => console.error(error)
  );
}


  //Logique derriere les POP UP
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
