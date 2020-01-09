import {Component, OnInit, Output} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    public parentCategory: string;
    public title;
    public rotate = false;
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
                    default:
                        this.title = 'НЕТ СОВПАДЕНИЙ';
                }
            });
    }

    public rotateSwitcher(category: string): void {
        if (this.rightMenuCategoryCheck == category) {
            this.rightMenuCategoryCheck = null;
        } else {
            this.rightMenuCategoryCheck = category;}
        this.rotate = !this.rotate;
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
    }

}
