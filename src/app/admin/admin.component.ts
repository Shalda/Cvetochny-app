import {Component, OnInit} from '@angular/core';
import {AuthService} from '../model/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent {
    public title = 'МАГАЗИН';
    constructor(private auth: AuthService,
                private router: Router) {
    }

    public titleChange(text: string): void {
        this.title = text;
    }

    logout() {
        this.auth.clear();
        this.router.navigateByUrl('/');
    }

}
