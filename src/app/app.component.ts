import {Component} from '@angular/core';
import {fAll} from '../assets/js/main';
import {HttpClient} from '@angular/common/http';
import {Product} from './model/product.model';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public constructor(private http: HttpClient) {

    }

    title = 'CvetochnyStore';
}
