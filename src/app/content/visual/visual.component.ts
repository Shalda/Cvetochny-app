import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {ActivatedRoute} from '@angular/router';
import {Visual} from '../../model/product.model';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-view',
    templateUrl: './visual.component.html',
    styleUrls: ['./visual.component.css']

})
export class VisualComponent {
    public selectedCategory: string;
    public visual: Visual;
    public images$: Observable<GalleryItem[]>;
    slides: GalleryItem[];
    public class: boolean = false;

    constructor(private _repository: ProductRepository, private _activeRoute: ActivatedRoute) {
        _activeRoute.pathFromRoot.forEach(route => route.params.subscribe(params => {
            if (params['category']) {
                this.selectedCategory = params['category'];
            }
            this.getVisual();
            this.images$ = of((this.visual.img).map(res => new ImageItem({
                src: `/assets/images/visual/${res}`,
                thumb: `/assets/images/visual/${res}`
            })));
        }));
    }

    public modalSwitcger(): void {
        if (!this.class) {
            this.class = true;
        } else {
            this.class = false;
        }
    }

    getVisual(): any {
        this.visual = this._repository.getVisualByCat(this.selectedCategory);
    }
}
