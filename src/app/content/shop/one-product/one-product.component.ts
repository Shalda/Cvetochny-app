import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product.model';
import {ProductRepository} from '../../../model/product.repository';
import {RestDataSource} from '../../../model/rest.datasource';
import {Subscription} from 'rxjs';
import { NgForm} from '@angular/forms';
import {SendEmailService} from '../../../model/send-email.service';

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

    constructor(
        private _route: ActivatedRoute,
        private _restData: RestDataSource,
        private _sendService: SendEmailService,
    ) {
    }


    public modalSwitcher(): void {
        this.class = !this.class;
    }

    public popUpSwitcher(): void {
        this.popUp = !this.popUp;
    }

    sendEmail(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            this.loading = true;
            this.buttonText = 'Отправка...';
            this._sendService.sendEmail(this.username, this.phonenumber, this.productId, this.product.name).subscribe(
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
        this.isLoading = true;
        this.productId = this._route.snapshot.params['index'];
        this.productSub = this._restData.getProduct(this.productId).subscribe(postProduct => {
            this.isLoading = false;
            this.product = postProduct.product;
        });
    }

    ngOnDestroy() {
        this.productSub.unsubscribe();
    }
}

