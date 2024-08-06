import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CorpsComponent } from './corps/corps.component';
import{EvenementComponent} from './evenement/evenement.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LieuComponent } from './lieu/lieu.component';
import { EquipementComponent } from './equipement/equipement.component';
import { ReglageComponent } from './reglage/reglage.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { PrestateurComponent } from './prestateur/prestateur.component';



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'evenement', component: EvenementComponent },
    { path: 'accueil', component:AcceuilComponent},
    { path: 'reservation', component: ReservationComponent },
    { path: 'lieu', component: LieuComponent },
    { path: 'equipement', component: EquipementComponent },
    { path: 'utilisateur', component: UtilisateurComponent },
    { path: 'reglage', component: ReglageComponent },
    { path: 'tasklist', component: TasklistComponent },
    { path: 'prestateur', component: PrestateurComponent }
    
    
];
