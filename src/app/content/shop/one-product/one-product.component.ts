import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/product.model';
import {ProductRepository} from '../../../model/product.repository';
import {RestDataSource} from '../../../model/rest.datasource';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {SendEmailService} from '../../../model/send-email.service';
import {Cart} from '../../../model/cart.model';

@Component({
    selector: 'app-one-product',
    templateUrl: './one-product.component.html',
    styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit, OnDestroy {
    public isLoading: boolean;
    public product: Product;
    private productId;
    public parentCategory;
    public class = false;
    public popUp = false;
    private productSub: Subscription;
    public loading = false;
    public buttonText = 'Отправить';
    public username: string;
    public phonenumber: number;
    public routerEventSub: Subscription;

    constructor(
        private _activeRoute: ActivatedRoute,
        private _restData: RestDataSource,
        private _sendService: SendEmailService,
        private _router: Router,
        public cart: Cart
    ) {
        this.routerEventSub =
            this._router.events.subscribe(() => {
                    if (this.productId != this._activeRoute.snapshot.params['index']) {
                        this.productId = this._activeRoute.snapshot.params['index'];
                        console.log(this.productId);
                        this.isLoading = true;
                        this.productSub = this._restData.getProduct(this.productId).subscribe(postProduct => {
                            if (this.product != postProduct.product) {
                                console.log(postProduct.product);
                                this.product = postProduct.product;
                            }
                            this.isLoading = false;
                        });
                    }
                }
            );
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
    }

    public modalSwitcher(): void {
        this.class = !this.class;
    }

    public popUpSwitcher(): void {
        this.popUp = !this.popUp;
    }

    public sendSMS() {
        console.log('sending sms');
        this._restData.sendSMS('в один клик');
    }

    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
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
                    this.buttonText = 'Отправлено';
                    form.reset();
                }
            );
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.productSub.unsubscribe();
        this.routerEventSub.unsubscribe();
    }
}

