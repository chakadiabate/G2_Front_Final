import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: 
  [
    RouterOutlet,
    RouterLink,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.authenticate(this.email, this.password).subscribe(
      (user: any) => {
        console.log('je suis dans login', user);
        // Redirige en fonction du rôle de l'utilisateur
        if (user) {
          console.log('je suis avant====',user.role);

          if (user.role.role === 'ADMIN') {
            console.log('je suis admin');
            this.router.navigate(['/acceuil']);
          } else if (user.role.role === 'PERSONNEL') {
            this.router.navigate(['/acceuil']);
          }
          else if (user.role.role === 'ORGANISATEUR') {
            this.router.navigate(['/acceuil']);
          }
           else {
            this.router.navigate(['/']);
          }
        }
      },
      (error) => {
        console.error('Erreur de connexion', error);
      }
    );
  }
}
