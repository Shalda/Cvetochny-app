import {Component} from '@angular/core';
import {Product, Visual} from '../model/product.model';
import {ProductRepository} from '../model/product.repository';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {el} from '@angular/platform-browser/testing/src/browser_util';


@Component({
    templateUrl: 'productEditor.component.html',
    styleUrls: ['productEditor.component.css']
})
export class ProductEditorComponent {
    public editing: boolean = false;
    public product: Product;
    public pCategory: string;
    public newCat: string;
    public newSubCat: string;
    public formSubmitted: boolean = false;

    constructor(private repository: ProductRepository,
                private router: Router,
                activeRoute: ActivatedRoute) {
        this.editing = activeRoute.snapshot.params['mode'] == 'edit';
        this.pCategory = activeRoute.snapshot.params['parentCategory'];
        this.product = new Product();
        if (this.editing) {
            Object.assign(this.product,
                repository.getProduct(activeRoute.snapshot.params['id']));
        }
    }

    public changeProductCategory(val: string): void {
        if (!val) {
            return;
        } else {
            this.product.category = val;
        }
    }

    public changeProductSubCategory(val: string): void {
        if (!val) {
            return;
        } else {
            this.product.subcategory = val;
        }
    }

    public changeProductParentCategory(val: string) {
        if (!val) {
            return;
        } else {
            this.product.parentCategory = val;
        }
    }

    get categories(): string[] {
        return this.repository.getCategories(this.pCategory);
    }

    get parentCategory(): string[] {
        return this.repository.getParentCategories();
    }


    get subCategories(): string[] {
        if (!this.product.category) {
            return;
        }
        return this.repository.getSubCategories(this.product.category);
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    save(form: NgForm) {
        this.formSubmitted = true;
        if (form.valid) {
            this.product.create_ts = new Date().toLocaleString();
            this.repository.saveProduct(this.product);
            this.formSubmitted = false;
            this.router.navigateByUrl('/admin/main/products');
        }
    }
}
