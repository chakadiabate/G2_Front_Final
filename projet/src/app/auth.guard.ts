import { ActivatedRouteSnapshot, CanActivate,  Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './Service/auth.service';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.userRole$.pipe(
      map(role => {
        const expectedRole = route.data['role'];
        console.log("auth data=========",route.data);

        console.log("auth=========",expectedRole);
        console.log("auth role=========",role);

        if (expectedRole=== "admin") {
          return true;
        } else {
          this.router.navigate(['/']); // Redirige vers la page de connexion si l'utilisateur n'a pas le rôle requis
          return false;
        }
      })
    );
  }
}
