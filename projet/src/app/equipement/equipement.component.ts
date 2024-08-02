import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquipementService } from '../Service/equipement.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-equipement',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    SidebarComponent
],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.css'
})
export class EquipementComponent implements OnInit {
  public equipements : any;
  public apis : any;

  constructor(public http : HttpClient, private equipementervice : EquipementService) {}

  ngOnInit() {
    this.equipementervice.getAllEquipement().subscribe(data => {
      this.equipements = data;
      console.log(data);
    });



  }
  public eqpe = {
    "id" : 0,
    "nom" : "",
    "designation" : "",
    "date" : "",
  
  }

  ajouterEquipement() {
    this.equipementervice.createEquipement(this.eqpe).subscribe();
  }

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
