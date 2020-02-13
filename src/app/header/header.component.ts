import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public menuStatus = false;
    public menuCategory: string;
    // public routerSub: Subscription;

    constructor(private _repository: ProductRepository, private _router: Router, private _activeRoute: ActivatedRoute) {
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
        // this.routerSub = this._router.events
        //     .pipe(
        //         filter(event => event instanceof NavigationEnd &&
        //             this._activeRoute.snapshot._routerState['url'] === '/category/shop' ||
        //             this._activeRoute.snapshot._routerState['url'] === '/category/wedding')
        //     )
        //     .subscribe(() => {
        //             window.scrollTo(0, 0);
        //         }
        //     );
    }

    ngOnDestroy(): void {
        // this.routerSub.unsubscribe();
    }
}
