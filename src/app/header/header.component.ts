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
    // public linkEnabled = false;

    constructor(private _repository: ProductRepository) {
        // fromEvent(window, 'resize').subscribe((e: any) => {
        //     this.linkEnabled = e.target.innerWidth <= 768;
        //     // this.linkEnabled = e.target.innerHeight <= 768;
        // });
    }

    public getCategory(cat): string[] {
        return this._repository.getCategories(cat);
    }

    public menuBigScreen(cl?: string): void {
        if (cl) {
            this.menuCategory = cl;
            this.menuToggle();
            return;
        } else {
            this.menuToggle();
        }
    }

    public menuToggle(): void {
        this.menuStatus = !this.menuStatus;
    }

    ngOnInit() {
        // if (window.matchMedia('(max-width: 768px)').matches) {
        //     this.linkEnabled = true;
        // }
    }

}
