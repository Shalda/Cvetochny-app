import {Component, OnInit, Output} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
    animations: [
        trigger('openClose', [
            state('open', style({
                height: '*',
                opacity: 1,
                left: '*',
                display: 'block'
            })),
            state('closed', style({
                height: '0px',
                minHeight: '0',
                opacity: 0,
                display: 'none'
            })),
            transition('open => closed', [
                animate('0.2s')
            ]),
            transition('closed => open', [
                animate('0.2s')
            ]),
        ]),
    ],
})
export class ShopComponent implements OnInit {
    public parentCategory: string;
    public title;
    public rightMenuCategoryCheck: string;

    constructor(private _repository: ProductRepository, private _activeRoute: ActivatedRoute, private _router: Router) {
        _router.events
            .subscribe(e => {
                if (this._activeRoute.snapshot.url[1].path == 'oformlenie') {
                    this.parentCategory = 'oformlenie';
                } else if (
                    this._activeRoute.snapshot.url[1].path == 'contact'
                ) {
                    this.parentCategory = 'contact';
                } else if (
                    this._activeRoute.snapshot.url[1].path == 'cart'
                ) {
                    this.parentCategory = 'cart';
                } else {
                    this.parentCategory = this._activeRoute.snapshot.params['parentcategory'] || undefined;
                }

                switch (this.parentCategory) {
                    case 'wedding':
                        this.title = 'СВАДЕБНАЯ ФЛОРИСТИКА';
                        break;
                    case 'shop':
                        this.title = 'МАГАЗИН';
                        break;
                    case 'oformlenie':
                        this.title = 'ОФОРМЛЕНИЕ';
                        break;
                    case 'contact':
                        this.title = 'КОНТАКТЫ';
                        break;
                    case 'cart':
                        this.title = 'КОРЗИНА';
                        break;
                    default:
                        this.title = 'НЕТ СОВПАДЕНИЙ';
                }
            });
    }

    public rotateSwitcher(category: string): void {
        if (this.rightMenuCategoryCheck == category) {
            this.rightMenuCategoryCheck = null;
        } else {
            this.rightMenuCategoryCheck = category;
        }
    }

    get categories(): string[] {
        if (!this.parentCategory) {
            return;
        }
        if (this.parentCategory == 'oformlenie') {
            return this._repository.getCategoriesOfVisuals();
        }
        return this._repository.getCategories(this.parentCategory);
    }

    public getSubcategories(category): string[] {
        if (!category) {
            return;
        }
        if (this._repository.getSubCategories(category).length !== 0) {
            return this._repository.getSubCategories(category);
        } else {
            return;
        }
    }
    ngOnInit() {
        const scrollRoutes: string[] = ['/category/shop', '/category/wedding', '/about-us', '/cart', '/oformlenie/Фотозоны' ];
        this._router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                const url = this._router.url;
                console.log(this._router.url);
                const regexp = /\/[a-zа-я0-9]*\/(shop|wedding)\/(?!id)[a-zа-я0-9\/]*/gi;
                const scrollAdd = regexp.test(url);
                console.log(scrollAdd);
                if (!scrollAdd) {

                    window.scroll({
                        top: 0,
                        left: 0,
                    });
                }
            }
        });

        function likeUrl(arr, url) {
            const anySymbol = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;
            const regexp = /\/[a-fа-я0-9]*\/\/[a-fа-я0-9]*\/\^id/gi;
            //search = new RegExp(search.toString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
            return arr.find(function(el) {
                return regexp.test(el);
            });
        }
    }

}
