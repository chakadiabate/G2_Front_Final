import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';  // Importer SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.authenticate(this.email, this.password).subscribe({
      next: (user: any) => {
        console.log('je suis dans login', user);
        // Redirige en fonction du rôle de l'utilisateur
        if (user) {
          console.log('je suis avant====', user.role.role);

          // Afficher un message de bienvenue avec SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Bienvenue',
            text: `Bonjour ${user.email}, vous êtes connecté en tant que ${user.role.role}.`,
            confirmButtonText: 'OK'
          }).then(() => {
            // Rediriger après avoir fermé l'alerte
            if (user.role.role === 'ADMIN') {
              this.router.navigate(['/accueil']);
            } else if (user.role.role === 'PERSONNEL') {
              this.router.navigate(['/accueil']);
            } else if (user.role.role === 'ORGANISATEUR') {
              this.router.navigate(['/accueil']);
            } else {
              this.router.navigate(['/']);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        // Afficher un message d'erreur avec SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: 'Email ou mot de passe incorrect',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Méthode pour récupérer les informations de l'utilisateur à partir du localStorage
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
