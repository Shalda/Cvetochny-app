import {Component, OnInit} from '@angular/core';
import {falseIfMissing} from 'protractor/built/util';
import {ProductRepository} from '../model/product.repository';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public menuStatus = false;
    public menuCategory: string;
    constructor(private _repository: ProductRepository) {
    }

    public getCategory(cat): string[] {
        return this._repository.getCategories(cat);
    }

    public menuBigScreen(cl?: string): void {
        if (cl) {
            this.menuCategory = cl;
            return;
        } else {
            this.menuToggle();
        }
    }

    public menuToggle(): void {
        this.menuStatus = !this.menuStatus;
    }

    ngOnInit() {
    }

}
