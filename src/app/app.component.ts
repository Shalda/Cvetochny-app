import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cart} from './model/cart.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public constructor(private http: HttpClient, private _cart: Cart,) {

    }
    ngOnInit(): void {
        if (localStorage['cart'] && this._cart.itemCount <= 0) {
            this._cart.setFromStorage(JSON.parse(localStorage.getItem('cart')));
        }
    }

}
