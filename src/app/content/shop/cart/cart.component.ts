import {Component, OnInit} from '@angular/core';
import {Cart} from '../../../model/cart.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(public cart: Cart, private _router: Router) {
    }

    public navToShop() {
        this._router.navigateByUrl('category/shop');
    }

    ngOnInit() {
        if (this.cart.itemCount === 0) {
            this.navToShop();
        }
    }

}
