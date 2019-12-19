import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product.model';
import {ProductRepository} from '../../../model/product.repository';

@Component({
    selector: 'app-one-product',
    templateUrl: './one-product.component.html',
    styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {
    public product: Product;
    private productId;
    public parentCategory;
    public class: boolean = false;
    public popUp: boolean = false;

    constructor(
        private _route: ActivatedRoute,
        private _repository: ProductRepository
    ) {
    }

    public modalSwitcger(): void {
        if (!this.class) {
            this.class = true;
        } else {
            this.class = false;
        }
    }

    public popUpSwitcher(): void {
        if (!this.popUp) {
            this.popUp = true;
        } else {
            this.popUp = false;
        }
    }

    ngOnInit() {
        this.parentCategory = this._route.snapshot.params['parentcategory'];
        this.productId = this._route.snapshot.params['index'];
        this.product = this._repository.getProducts(this.parentCategory).find(p => p.id == this.productId);
    }
}

