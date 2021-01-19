import {Component, OnInit} from '@angular/core';
import {Cart} from '../../../model/cart.model';
import {Router} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {SendEmailService} from '../../../model/send-email.service';
import {OrderRepository} from '../../../model/order.repository';
import {Order} from '../../../model/order.model';
import {NgForm} from '@angular/forms';
import {RestDataSource} from '../../../model/rest.datasource';
import {MetrikaService} from '../../../common/services/metrika.service';
declare let gtag: Function;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    public loading = false;
    public delivery ? = false;
    public orderSent = false;

    constructor(
        private _sendService: SendEmailService,
        public cart: Cart,
        private _router: Router,
        private _adapter: DateAdapter<any>,
        public repository: OrderRepository,
        private metrikaService: MetrikaService,
        public order: Order, private _restData: RestDataSource
    ) {
    }
    public sendSms() {
        this._restData.sendSMS('с помощью корзины');
    }
    public metrika(value) {
        this.metrikaService.metrika(value);
    }

    submitOrder(form: NgForm) {
       this.sendSms();
        this.loading = true;
        if (form.valid) {
           this.metrika('zakaz');
            this.repository.saveOrder(this.order).subscribe(order => {
                this.sendOder();
                this.order.clear();
                this.cart.clear();
                this.orderSent = true;
                this.loading = false;
            });
        }
    }


    sendOder() {
        this._sendService.sendEmail(
            'order',
            this.order.clientName,
            this.order.clientPhone,
            null,
            null,
            null,
            null,
            this.order).subscribe(
            data => {
                const res: any = data;
                console.log(
                    `mail has been sent`
                );
            },
            err => {
                console.log(err);
            }
        );
    }

    ngOnInit() {
        this._adapter.setLocale('ua');
        if (this.cart.itemCount === 0) {
            this._router.navigateByUrl('category/shop');
        }
        this.order.deliveryWay = 'самостоятельно из магазина';
        this.order.paymentWay = 'наличными';
        this.order.receiveSolo = 'лично';
        this.order.timeDelivery = '12:00';
        this.cart.lines.forEach(prod => {
            this.order.cart.push(
                {
                    productId: prod.product._id,
                    productName: prod.product.name,
                    productPrice: prod.product.price,
                    productQuantity: prod.quantity
                }
            );
        });
        this.order.itemCount = this.cart.itemCount;
        this.order.cartPrice = this.cart.cartPrice;
    }

    deliveryLog() {
        this.delivery = !this.delivery;
    }


}
