import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../model/auth.service';

@Injectable()
export class AuthGuard {
    constructor(private _router: Router,
                private _auth: AuthService) {
    }
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (!this._auth.getIsAuth) {
            this._router.navigateByUrl('/admin/auth');
            return false;
        }
        return true;
    }
}