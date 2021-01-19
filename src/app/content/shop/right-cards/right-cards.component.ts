import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product.model';
import {ActivatedRoute} from '@angular/router';
import {ProductRepository} from '../../../model/product.repository';
import {Cart} from '../../../model/cart.model';
import {ToCartModalService} from '../../../common/services/toCartModal.service';

@Component({
    selector: 'app-right-cards',
    templateUrl: './right-cards.component.html',
    styleUrls: ['./right-cards.component.css']
})
export class RightCardsComponent implements OnInit {
    public parentCategory: string = undefined;
    public selectedCategory: string;
    public orderSelector: string;
    length: number;
    pageSize = 12;

    constructor(
        private _repository: ProductRepository,
        private _activeRoute: ActivatedRoute,
        private cart: Cart,
        private _modalService: ToCartModalService
    ) {
        if (window.innerHeight > 1500) {
            this.pageSize = 24;
        }
        if (window.innerHeight > 2880) {
            this.pageSize = 60;
        }
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
            const filterList = document.querySelectorAll('.filter-catalog .navLink');
            if (filterList) {
                for (let i = 0; i < filterList.length; i++) {
                    filterList[i].innerHTML = filterList[i].innerHTML.slice(8);
                }
            }
        }
    }

    openModal(id: string) {
        this._modalService.open(id);
    }


    onScroll() {
        if (this.pageSize < this.length) {
            this.pageSize += 12;
        }
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.openModal(product._id);
    }

    // get products(): Product[] {
    //     this.length = this.getAllproducts().length;
    //     const pageIndex = this.pageSelected * this.pageSize;
    //     return  this.getAllproducts().slice(pageIndex, pageIndex + this.pageSize);
    // }
    get products(): Product[] {
        this.length = this.getAllproducts().length;
        return this.getAllproducts().slice(0, this.pageSize);
    }

    getAllproducts(): Product[] {
        let products: Product[];
        if (this.selectedCategory === undefined) {
            products = this._repository.getProducts(this.parentCategory);
        } else {
            products = this._repository.getProducts(this.parentCategory)
                .filter(p => p.subcategory === this.selectedCategory || p.category === this.selectedCategory);
        }
        let num = 1;
        for (let i = 0; i < 5; i++) {
            if (products[i]) {
                products[i].newProd = ++num;
            } else {
                break;
            }
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
