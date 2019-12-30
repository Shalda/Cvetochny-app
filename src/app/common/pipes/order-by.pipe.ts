import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../model/product.model';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(products: Product[], orderText?: string): Product[] {
        let sortedProducts: Product[] = [];
        switch (orderText) {
            case 'expensive':
                sortedProducts = products.sort((a, b) => {
                    return +b.price - +a.price;
                });
                break;
            case 'cheap':
                sortedProducts = products.sort((a, b) => {
                    return +a.price - +b.price;
                });
                break;
            case 'novelty':
                sortedProducts = products.sort((a, b) => {
                    return <any>new Date(b.create_ts) - <any>new Date(a.create_ts);
                });
                break;
            default:
                return products;
        }
        if (sortedProducts.length > 0) {
            return sortedProducts;
        }
    }
}

