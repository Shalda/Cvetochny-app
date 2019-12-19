import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../model/product.model';

@Pipe({
    name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

    transform(products: Product[], category?: string): Product[] {
        if (category === undefined ) {
            return products;
        } else  {
            return products.filter(p => p.subcategory === category || p.category === category);
        }
    }

}
