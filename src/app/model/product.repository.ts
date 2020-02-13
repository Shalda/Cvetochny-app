import {Injectable} from '@angular/core';
import {Product, Visual} from './product.model';
import {RestDataSource} from './rest.datasource';
import {Subject} from 'rxjs';

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private visuals: Visual[] = [];
    public productsUpdated = new Subject<boolean>();

    constructor(private dataSource: RestDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data.products.reverse();
        });
        dataSource.getVisuals().subscribe(data => {
            this.visuals = data.visuals.reverse();
        });
    }

    getProducts(parentCategory: string = null, category: string = null, subcategory: string = null): Product[] {
        if (!parentCategory) {
            return this.products;
        }
        const productsArray = this.products.filter(p => parentCategory === p.parentCategory);
        let num = 1;
        for (let i = 0; i < 5; i++) {
            if (productsArray[i]) {
                productsArray[i].newProd = ++num;
            } else {
                break;
            }
        }
        return productsArray
            .filter(p => category === null || category === p.category)
            .filter(p => subcategory === null || subcategory === p.subcategory);
    }

    getProduct(id): Product {
        return this.products.find(p => p._id == id);
    }

    getVisual(id): Visual {
        return this.visuals.find(p => p._id == id);
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

    deleteProduct(id) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.findIndex(pr => pr._id == id), 1);
        });
    }

    updateVisual(id: string, name: string, parentCategory: string, category: string,
                 description: string, price: string, images: any) {
        let visualData: Visual | FormData;
        if (images[0].name) {
            visualData = new FormData();
            visualData.append('_id', id);
            visualData.append('name', name);
            visualData.append('parentCategory', parentCategory);
            visualData.append('category', category);
            visualData.append('description', description);
            visualData.append('price', price);
            for (const image of images) {
                visualData.append('img', image, name);
            }
        } else {
            visualData = {
                _id: id,
                name: name,
                parentCategory: parentCategory,
                category: category,
                description: description,
                price: price,
                img: images
            };
        }
        this.dataSource.updateVisual(visualData, id).subscribe(visRes => {
            this.visuals.splice(this.visuals.findIndex(v => v._id == id), 1, visRes.visual);
        });
    }

    addVisual(name: string, parentCategory: string, category: string,
              description: string, price: string, imgArray: File[]) {
        const visualData = new FormData();
        visualData.append('name', name);
        visualData.append('parentCategory', parentCategory);
        visualData.append('category', category);
        visualData.append('description', description);
        visualData.append('price', price);
        for (const image of imgArray) {
            visualData.append('img', image, name);
        }
        this.dataSource.saveVisual(visualData)
            .subscribe(p => {
                    console.log(p.message);
                    this.visuals.push(p.visual);
                }
            );
    }

    deleteVisual(id) {
        this.dataSource.deleteVisual(id).subscribe(p => {
            this.visuals.splice(this.visuals.findIndex(v => v._id == id), 1);
        });
    }

    addProduct(name: string, parentCategory: string, category: string,
               subcategory: string, description: string, diameter: string, price: string, image: any, date: any) {
        this.productsUpdated.next(false);
        const productData = new FormData();
        productData.append('name', name);
        productData.append('parentCategory', parentCategory);
        productData.append('category', category);
        productData.append('subcategory', subcategory);
        productData.append('description', description);
        productData.append('diameter', diameter);
        productData.append('price', price);
        productData.append('img', image, name);
        productData.append('create_ts', date);
        this.dataSource.saveProduct(productData)
            .subscribe(p => {
                    this.products.push(p.product);
                    this.productsUpdated.next(true);
                }
            );
    }

    updateProduct(id: string, name: string, parentCategory: string, category: string,
                  subcategory: string, description: string, diameter: string, price: string, image: File | string, date) {
        this.productsUpdated.next(false);
        let productData: Product | FormData;
        if (typeof image === 'object') {
            productData = new FormData();
            productData.append('_id', id);
            productData.append('name', name);
            productData.append('parentCategory', parentCategory);
            productData.append('category', category);
            productData.append('subcategory', subcategory);
            productData.append('description', description);
            productData.append('diameter', diameter);
            productData.append('price', price);
            productData.append('img', image, name);
            productData.append('create_ts', date);

        } else {
            productData = {
                _id: id,
                name: name,
                parentCategory: parentCategory,
                category: category,
                subcategory: subcategory,
                description: description,
                diameter: diameter,
                price: price,
                img: image
            };
        }
        this.dataSource.updateProduct(productData, id)
            .subscribe(p => {
                this.products.splice(this.products.findIndex(pr => pr._id == id), 1, p.product);
                this.productsUpdated.next(true);
            });
    }

}
