import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EquipementService } from '../Service/equipement.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { PrestateurService } from '../Service/prestateur.service';
import { Equipement, Prestateur } from '../Models/utilisateurmodel.component';

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
 
  constructor(
    public http : HttpClient, 
    private equipementervice : EquipementService,
    private prestaservice:PrestateurService,
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
   
  const newEquipement: Equipement = this.EquipementForm.value;
  newEquipement.presta = { id: this.EquipementForm.value.prestateurs } as Prestateur; 
  


  //this.addTache(newTask);

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
