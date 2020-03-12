import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product.model';
import {RestDataSource} from '../../../model/rest.datasource';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../../../model/send-email.service';
import {Cart} from '../../../model/cart.model';
import {ToCartModalService} from '../../../common/services/toCartModal.service';

declare let gtag: Function;

@Component({
    selector: 'app-one-product',
    templateUrl: './one-product.component.html',
    styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit, OnDestroy {
    public isLoading: boolean;
    public product: Product;
    private productId;
    public productQuantity;
    public parentCategory;
    public class = false;
    public popUp = false;
    private productSub: Subscription;
    public loading = false;
    public messageSent = false;
    public buttonText = 'Отправить';
    public username: string;
    public phonenumber: number;
    public routerEventSub: Subscription;
    public productLine;

    constructor(
        private _activeRoute: ActivatedRoute,
        private _restData: RestDataSource,
        private _sendService: SendEmailService,
        private _router: Router,
        public cart: Cart,
        private _modalService: ToCartModalService
    ) {
        this.routerEventSub =
            this._router.events.subscribe(() => {
                    if (this.productId != this._activeRoute.snapshot.params['index']) {
                        this.productId = this._activeRoute.snapshot.params['index'];
                        this.isLoading = true;
                        this.productSub = this._restData.getProduct(this.productId).subscribe(postProduct => {
                            if (this.product != postProduct.product) {
                                this.product = postProduct.product;
                            }
                            this.isLoading = false;
                        });
                    }
                }
            );
    }

    openModal(id: string) {
        this._modalService.open(id);
    }

    addProductToCart(product: Product) {
        if (!this.cart.productQuantity(product._id)) {
            gtag('event', 'sendemail', {'event_category': 'cart', 'event_action': 'send',});
        }
        this.cart.addLine(product);
        this.productLine = this.cart.lines.find(line => line.product._id == this.productId);
        this.openModal(product._id);
    }

    public modalSwitcher(): void {
        this.buttonText = 'Отправить';
        this.messageSent = false;
        this.class = !this.class;
    }

    public popUpSwitcher(): void {
        this.popUp = !this.popUp;
    }

    public sendSMS() {
        console.log('sending sms');
        this._restData.sendSMS('в один клик');
    }

    public setProductQuantity() {
        this.productQuantity = this.cart.productQuantity(this.productId);
    }

    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            gtag('event', 'sendemail', {'event_category': 'kupit', 'event_action': 'send',});
            this.sendSMS();
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail('click', this.username, this.phonenumber, this.productId, this.product.name).subscribe(
                data => {
                    const res: any = data;
                    console.log(
                        `mail has been sent`
                    );
                },
                err => {
                    console.log(err);
                    this.loading = false;
                    this.buttonText = 'Произошла ошибка при отправке, попробуйте позже';
                }, () => {
                    this.loading = false;
                    this.messageSent = true;
                    this.buttonText = 'Отправлено';
                    form.reset();
                }
            );
        }
    }

    ngOnInit() {
        this.setProductQuantity();
        this.productLine = this.cart.lines.find(line => line.product._id == this.productId);
    }

    ngOnDestroy() {
        this.productSub.unsubscribe();
        this.routerEventSub.unsubscribe();
    }
}

