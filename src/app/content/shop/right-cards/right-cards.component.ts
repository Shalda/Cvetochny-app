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
        let products: Product[];
        if (this.selectedCategory === undefined) {
            products = this._repository.getProducts(this.parentCategory);
        } else {
            products = this._repository.getProducts(this.parentCategory)
                .filter(p => p.subcategory === this.selectedCategory || p.category === this.selectedCategory);
        }
        return this.filterProducts(products);
    }

    filterProducts(products: Product[]): Product[] {
        let sortedProducts: Product[] = [];
        switch (this.orderSelector) {
            case 'expensive':
                sortedProducts = products.sort((a, b) => {
                    return +b.price - +a.price;
                });
                break;
            case 'cheap':
                sortedProducts = products.sort((a, b) => {
                    return +a.price - +b.price;
                });
                break;
            case 'novelty':
                sortedProducts = products.sort((a, b) => {
                    return <any>new Date(b.create_ts) - <any>new Date(a.create_ts);
                });
                break;
            default:
                return products;
        }
        if (sortedProducts.length > 0) {
            return sortedProducts;
        }
    }
}
