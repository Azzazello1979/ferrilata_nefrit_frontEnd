import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authsvc: AuthService, private router: Router) { };
    canActivate() {
        if (!this.authsvc.isLoggedIn()) {
            this.router.navigate(['']);
        }
        return this.authsvc.isLoggedIn();
    }
}