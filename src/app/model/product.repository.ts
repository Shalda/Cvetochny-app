import {Injectable} from '@angular/core';
import {Product, Visual} from './product.model';
import {RestDataSource} from './rest.datasource';

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private visuals: Visual[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
        });
        dataSource.getVisuals().subscribe(data => {
            this.visuals = data;
        });
    }

    getProducts(parentCategory: string = null, category: string = null, subcategory: string = null): Product[] {
        if (!parentCategory) {
            return this.products;
        }
        return this.products
            .filter(p => parentCategory === p.parentCategory)
            .filter(p => category === null || category === p.category)
            .filter(p => subcategory === null || subcategory === p.subcategory);
    }

    getProduct(id: number): Product {
        return this.products.find(p => p.id == id);
    }

    getVisual(id: number): Visual {
        return this.visuals.find(p => p.id == id);
    }

    getVisuals(): Visual[] {
        return this.visuals;

    }

    getVisualByCat(category?: string): Visual {
        if (!category) {
            return this.visuals[0];
        }
        return this.visuals.find(p => p.category === category);
    }

    private _uniqueCategory(arr: string[]): string[] {
        return arr.filter((c, index, array) => array.indexOf(c) === index).sort();
    }
    getParentCategories(): string[] {
        const category: string[] = this.products.map(p => p.parentCategory);
        return this._uniqueCategory(category);

    }
    getCategories(parentCategory: string): string[] {
        const category: string[] = this.products.filter(p => parentCategory === p.parentCategory).map(p => p.category);
        return this._uniqueCategory(category);

    }

    getCategoriesOfVisuals(): string[] {
        const category: string[] = this.visuals.map(p => p.category);
        return this._uniqueCategory(category);

    }

    getSubCategories(category): string[] {
        const productArr: Product[] = this.products.filter(p => category === p.category);
        const subcategoryArr: string[] = [];
        productArr.forEach(product => {
                if (!product.subcategory) {
                    return;
                } else {
                    subcategoryArr.push(product.subcategory);
                }
            }
        );
        return this._uniqueCategory(subcategoryArr);
    }

    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.dataSource.saveProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product);
                });
        }
    }

    // private generateID(): number {
    //     let candidate = 100;
    //     while (this.getProduct(candidate) != null) {
    //         candidate++;
    //     }
    //     return candidate;
    // }


    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.findIndex(p => p.id == id), 1);
        });
    }


    saveVisual(visual: Visual) {
        if (visual.id == null || visual.id == 0) {
            this.dataSource.saveVisual(visual)
                .subscribe(p => this.visuals.push(p));
        } else {
            this.dataSource.updateVisual(visual)
                .subscribe(p => {
                    this.visuals.splice(this.visuals.findIndex(p => p.id == visual.id), 1, visual);
                });
        }
    }

    deleteVisual(id: number) {
        this.dataSource.deleteVisual(id).subscribe(p => {
            this.visuals.splice(this.visuals.findIndex(p => p.id == id), 1);
        });
    }


}
