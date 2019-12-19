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
    public linkEnabled = false;

    constructor(private _repository: ProductRepository) {
        fromEvent(window, 'resize').
        subscribe((e: any) => {
                    this.linkEnabled = e.target.innerWidth < 768;
        });
    }

    public getCategory(cat): string[] {
        return this._repository.getCategories(cat);
    }

    public menuBigScreen(cl?: string): void {
        if (window.matchMedia('(min-width: 769px)').matches) {
            if (cl) {
                this.menuCategory = cl;
            }
            return;
        } else {
            this.menuToggle();
        }
    }

    public menuToggle(): void {
        if (this.menuStatus) {
            this.menuStatus = false;
        } else {
            this.menuStatus = true;
        }
    }

    ngOnInit() {
        if (window.matchMedia('(max-width: 769px)').matches) {
            this.linkEnabled = true;
        }
    }

}
