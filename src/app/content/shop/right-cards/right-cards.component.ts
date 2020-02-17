import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductRepository} from '../../../model/product.repository';
import {Cart} from '../../../model/cart.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-right-cards',
    templateUrl: './right-cards.component.html',
    styleUrls: ['./right-cards.component.css']
})
export class RightCardsComponent implements OnInit {
    public parentCategory: string = undefined;
    public selectedCategory: string;
    public orderSelector: string;
    pageSelected = 0;
    length: number;
    pageSize = 15;
    pageSizeOptions: number[] = [5, 15, 25, 50];
    pageEvent: PageEvent;

    constructor(private _repository: ProductRepository, private _activeRoute: ActivatedRoute, private cart: Cart) {
        _activeRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
            if (params['parentcategory']) {
                this.parentCategory = params['parentcategory'];
            }
            this.selectedCategory = params['subcategory'] || params['category'] || undefined;
            this.orderSelector = '';

        }));
    }

    ngOnInit() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            // slice long filter text
            const filterList = document.querySelectorAll('.filter-catalog .navLink');
            if (filterList) {
                for (let i = 0; i < filterList.length; i++) {
                    filterList[i].innerHTML = filterList[i].innerHTML.slice(8);
                }
            }
        }
    }

    paginatorEvent(event: PageEvent) {
        console.log(event);
        this.pageSize = event.pageSize;
        this.pageSelected = event.pageIndex;
        this.pageEvent = event;
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
    }
    get products(): Product[] {
        this.length = this.getAllproducts().length;
        const pageIndex = this.pageSelected * this.pageSize;
        return  this.getAllproducts().slice(pageIndex, pageIndex + this.pageSize);
    }
    getAllproducts(): Product[] {
        if (this.selectedCategory === undefined) {
            return this._repository.getProducts(this.parentCategory);
        } else {
            return this._repository.getProducts(this.parentCategory)
                .filter(p => p.subcategory === this.selectedCategory || p.category === this.selectedCategory);
        }
    }
}
