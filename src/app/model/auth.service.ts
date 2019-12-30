import {Injectable} from '@angular/core';
import {RestDataSource} from './rest.datasource';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userId: string;
    private tokenTimer: any;
    private auth_token: string;
    private isAuthenticated = false;
    private authStatusListener = new Subject<boolean>();

    constructor(private _datasource: RestDataSource, private _router: Router) {
    }

    getToken() {
        return this.auth_token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }


    createUser(email: string, username: string, password: string) {
        return this._datasource.createUser(email, username, password);
    }

    authenticate(username: string, password: string) {
        return this._datasource.authenticate(username, password).pipe(map(response => {
            this.auth_token = response.token ? response.token : null;
            if (response.token) {
                const expiresInDuration = response.expiresIn;
                this.tokenTimer = setTimeout(() => {
                    this.clear();
                }, expiresInDuration * 1000);
                this.userId = response.userId;
                const now = new Date();
                const expirationDate = new Date(
                    now.getTime() + expiresInDuration * 1000
                );
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.authStatusListener.next(true);
                this.saveAuthData(this.auth_token, expirationDate, this.userId);
                return response;
            }
        }));
    }

    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(() => {
            this. clear();
        }, duration * 1000);
    }

    clear() {
        this.auth_token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this._router.navigateByUrl('/');
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.auth_token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }


}
