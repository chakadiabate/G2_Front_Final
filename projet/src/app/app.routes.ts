import { Routes } from '@angular/router';
import{EvenementComponent} from './evenement/evenement.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PrestateurComponent } from './prestateur/prestateur.component';
import { EquipementComponent } from './equipement/equipement.component';
import { ReglageComponent } from './reglage/reglage.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { PrestateurListComponent } from './prestateur-list/prestateur-list.component';
import { TasklistComponent } from './tasklist/tasklist.component';


export const routes: Routes = [

        { path: '', component: LoginComponent },
        { path: 'evenement', component: EvenementComponent },
        { path: 'accueil', component: AcceuilComponent }, 
        { path: 'reservation', component: ReservationComponent },
        { path: 'prestateur', component: PrestateurListComponent },
        { path: 'equipement', component: EquipementComponent },
        { path: 'reglage', component: ReglageComponent },
        { path: 'utilisateur', component: UtilisateurComponent },
        { path: 'add-prestateur', component: PrestateurComponent },
        { path: 'prestateurs', component: PrestateurListComponent },
        { path: 'edit-prestateur/:id', component: PrestateurComponent },
        { path: 'sidebars', component: SidebarComponent },
        { path: 'tasklist', component: TasklistComponent },
        

        
   
      
];
