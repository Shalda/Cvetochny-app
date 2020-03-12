import {Component, OnInit} from '@angular/core';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
    templateUrl: 'productTable.component.html',
    styleUrls: ['./productTable.component.css']
})
export class ProductTableComponent implements OnInit {
    public parentCategory: string = undefined;
    public categoryIsProduct: boolean;
    constructor(private router: Router, private repository: ProductRepository, private _activeRoute: ActivatedRoute) {
        this.parentCategory = _activeRoute.snapshot.url[0].path;
    }

    getProducts(): any[] {
        if (!this.categoryIsProduct) {
            return this.repository.getVisuals();
        } else {
            return this.repository.getProducts();

        }
    }
    // get products(): Product[] {
    //     this.length = this.getAllproducts().length;
    //     const pageIndex = this.pageSelected * this.pageSize;
    //     return  this.getAllproducts().slice(pageIndex, pageIndex + this.pageSize);
    // }

    deleteProduct(id: number) {
        if (!this.categoryIsProduct) {
            this.repository.deleteVisual(id);
        } else if (this.categoryIsProduct) {
            this.repository.deleteProduct(id);
        } else {
            this.router.navigateByUrl('/admin/');
        }
    }

    ngOnInit() {
        this.categoryIsProduct = this.parentCategory == 'products';
    }
}

