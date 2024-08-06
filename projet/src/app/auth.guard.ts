import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const role = this.authService.getUserRole();
    const expectedRole = route.data['role'];
    
    console.log("auth data=========", route.data);
    console.log("auth=========", expectedRole);
    console.log("auth role=========", role);

    if (role === expectedRole) {
      return of(true);
    } else {
      this.router.navigate(['/']); // Redirige vers la page d'accueil si l'utilisateur n'a pas le rôle requis
      return of(false);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirige vers la page de connexion
  }



}
