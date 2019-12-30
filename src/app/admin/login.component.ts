import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../model/auth.service';


@Component({
    selector: 'app-sign',
    template: `<section class="auth__section">
        <div class="auth__title">
            <h3>Регистрация пользователя</h3>
        </div>
        <div class="auth__error"
             *ngIf="errorMessage != null">
            {{errorMessage}}
        </div>
        <div class="auth__form">
            <form novalidate #form="ngForm" (ngSubmit)="signin(form)">
                <mat-form-field class="auth_box">
                    <input  autofocus
                            matInput
                            placeholder="Введите email"
                            name="email"
                            type="email"
                            [(ngModel)]="email"
                            required
                            email
                    >
                </mat-form-field>
                <mat-form-field class="auth_box">
                    <input  matInput
                            placeholder="Введите имя"
                            name="username"
                            [(ngModel)]="username"
                            required>
                </mat-form-field>
                <mat-form-field class="auth_box">
                    <input
                            matInput
                            name="password"
                            placeholder="Введите пароль"
                            [type]="hide ? 'password' : 'text'"
                            [(ngModel)]="password" required
                    >
                    <button type="button" mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'"
                            [attr.aria-pressed]="hide"

                    >
                        <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
                    </button>
                </mat-form-field>
                <div>
                    <button #authSub mat-raised-button class="auth__button" type="submit">Register</button>
                </div>
            </form>
        </div>
    </section>`,
    styleUrls: ['./auth.component.css']
})
export class SignComponent implements OnInit {
    public username: string;
    public password: string;
    public email: string;
    public errorMessage: string;
    public hide = true;

    constructor(private _router: Router, private _auth: AuthService) {
    }

    signin(form: NgForm) {
        if (form.valid) {if (form.invalid) {
            return;
        }
            this._auth.createUser(form.value.email, form.value.username, form.value.password);
        }
    }

    ngOnInit() {
    }

}
