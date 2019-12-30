import {Injectable} from '@angular/core';
import {RestDataSource} from './rest.datasource';
import {ProductRepository} from './product.repository';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Visual} from './product.model';

@Injectable()
export class VisualModelResolver {
    constructor(
        private model: ProductRepository,
        private dataSource: RestDataSource) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<{message: string, visuals: Visual[]}> {
        return this.model.getVisualByCat() == undefined
            ? this.dataSource.getVisuals() : null;
    }
}