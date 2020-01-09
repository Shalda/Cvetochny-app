import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../model/auth.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    public username: string;
    public password: string;
    public email: string;
    public errorMessage: string;
    public hide = true;
    private authStatusSub: Subscription;
    public userIsAuthenticated = false;

    constructor(private _router: Router, private _auth: AuthService) {
    }

    authenticate(form: NgForm) {
        if (form.valid) {
            this._auth.authenticate(this.username, this.password).subscribe(
                response => {
                    if (this.userIsAuthenticated) {
                        this._router.navigateByUrl('/admin/main');
                    }
                },
                error => {
                    console.log(error);
                    this.errorMessage = 'Ошибка аутентификации, данные неверны!';
                }
                );
        } else {
            this.errorMessage = 'Необходимо заполнить все поля';
        }
    }

    ngOnInit() {
        this.authStatusSub = this._auth.getAuthStatusListener().subscribe(
            authStatus => {
                this.userIsAuthenticated = authStatus;
            }
        );
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }

}
