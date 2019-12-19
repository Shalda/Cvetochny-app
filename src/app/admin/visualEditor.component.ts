import {Component} from '@angular/core';
import {Visual} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    templateUrl: 'visualEditor.component.html',
    styleUrls: ['visualEditor.component.css']
})
export class VisualEditorComponent {
    editing: boolean = false;
    product: Visual;
    public newCategory: string;
    public formSubmitted: boolean = false;

    // category: string;

    constructor(private repository: ProductRepository,
                private router: Router,
                activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params['mode'] == 'edit';
        // this.category = activeRoute.snapshot.params['category'];
        this.product = new Visual();
        if (this.editing) {
            Object.assign(this.product, repository.getVisual(activeRoute.snapshot.params['id']));
        } else {
            this.product.parentCategory = 'oformlenie';
        }
    }

    public changeProductCategory(val: string): void {
        if (!val) {
            return;
        } else {
            this.product.category = val;
        }
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    public removeImg(i: number): void {
        this.product.img.splice(i, 1);
    }

    public newImageAdd() {
        if (!this.product.img) {
            this.product.img = [];
            this.product.img.push('example.jpg');
        } else {
            this.product.img.push('example.jpg');
        }
    }

    save(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            this.product.create_ts = new Date().toLocaleString();
            this.repository.saveVisual(this.product);
            this.formSubmitted = false;
            this.router.navigateByUrl('/admin/main/visuals');
            // form.reset();
        }
    }
}
