import {Injectable} from '@angular/core';
import {Product} from './product.model';

@Injectable()

export class Cart {
    public lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    constructor() {
    }

    public addLine(product: Product, quantity: number = 1) {
        const line = this.lines.find(line => line.product._id == product._id);
        if (line != undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }
        this.recalculate();
    }

    public productQuantity(id: string) {
        const line = this.lines.find(line => line.product._id == id);
        if (!line) {
            return 0;
        } else {
            return line.quantity;
        }
    }

    public updateQuantity(product: Product, quantity: number) {
        const line = this.lines.find(line => line.product._id == product._id);
        if (line != undefined) {
            line.quantity = Number(quantity);
        }
        this.recalculate();
    }

    public incrementQuantity(product: Product) {
        const line = this.lines.find(line => line.product._id == product._id);
        if (line != undefined) {
            line.quantity++;
        }
        this.recalculate();
    }

    public decrementQuantity(product: Product) {
        const line = this.lines.find(line => line.product._id == product._id);
        if (line != undefined) {
            line.quantity--;
            if (line.quantity <= 0) {
                this.removeLine(product._id);
            }
        }
        this.recalculate();
    }

    public removeLine(id: string) {
        const index = this.lines.findIndex(line => line.product._id == id);
        if (index < 0) {
            return;
        }
        this.lines.splice(index, 1);
        this.recalculate();
    }

    public clear() {
        this.lines = [];
        this.itemCount = 0;
        this.cartPrice = 0;
        localStorage.removeItem('cart');
    }

    private recalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.price);
        });
        const cartCopy = {
            lines: this.lines,
            itemCount: this.itemCount,
            cartPrice: this.cartPrice,
        };
        if (this.itemCount <= 0) {
            localStorage.removeItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify(cartCopy));
        }

    }

    public setFromStorage(cart) {
        this.itemCount = cart.itemCount;
        this.cartPrice = cart.cartPrice;
        this.lines = cart.lines;
    }
}

export class CartLine {
    constructor(public product: Product,
                public quantity: number) {
    }

    get lineTotal() {
        return this.quantity * this.product.price;
    }
}



