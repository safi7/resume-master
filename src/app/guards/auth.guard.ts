import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
        const token = localStorage.getItem('jwt_token');
        if (token) {
            const helper = new JwtHelperService();
            const isExpired = helper.isTokenExpired(token);
            if (!isExpired) { return true; }
        }

        this.router.navigate(['/login'], { queryParams: { return: state.url } });
        return false;
    }
}
