import {CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, Router, Route} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanLoad } from '@angular/router/src/interfaces';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    

    constructor(private authService: AuthService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if  (this.authService.isAuth()){
            return true;
        }      
        this.router.navigate(['/signin']);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        if  (this.authService.isAuth()){
            return true;
        }      
        this.router.navigate(['/signin']);
    }

}