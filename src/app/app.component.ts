import {Component, OnInit} from '@angular/core';
import {fAll} from '../assets/js/main';
import {HttpClient} from '@angular/common/http';
import {Product} from './model/product.model';
import {Observable} from 'rxjs';
import {Cart} from './model/cart.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public constructor(private http: HttpClient, private _cart: Cart) {

    }
    ngOnInit(): void {
        if (sessionStorage['cart'] && this._cart.itemCount <= 0) {
            this._cart.setFromStorage(JSON.parse(sessionStorage.getItem('cart')));
        }
    }

}
