import {Injectable} from '@angular/core';
import {Cart, CartLine} from './cart.model';

@Injectable()
export class Order {
    public _id?: string;
    // required fields:
    public clientName: string;
    public clientPhone: string;
    public deliveryWay: string;
    public paymentWay: string;
    // address delivery
    public addressDelivery?: string;
    public dateDelivery?: string;
    public timeDelivery?: string;
    // who will be the recipient
    public receiveSolo?: string;
    // another person data
    public friendName?: string;
    public friendPhone?: string;
    public shipped = false;
    public itemCount = 0;
    public cartPrice = 0;
    public cart: ProductsShortcut[] = [];

    clear() {
        this._id = null;
        this.clientName = this.clientPhone = this.deliveryWay = this.paymentWay = this.cartPrice = this.itemCount = null;
        this.addressDelivery = this.dateDelivery = this.timeDelivery = this.receiveSolo = this.friendName = this.friendPhone = null;
        this.shipped = false;
        this.cart = [];
    }

}


export class ProductsShortcut {
    constructor(
        public productId: string,
        public productName: string,
        public productPrice: number,
        public productQuantity: number,
    ) {
    }
}
