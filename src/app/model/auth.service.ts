import {Injectable} from '@angular/core';
import {RestDataSource} from './rest.datasource';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor ( private _datasource: RestDataSource) {
    }
    authenticate(username: string, password: string): Observable<boolean> {
        return this._datasource.authenticate(username, password);
    }
    get authenticated(): boolean {
        return this._datasource.auth_token != null;
    }
    clear() {
        this._datasource.auth_token = null;
    }
}
