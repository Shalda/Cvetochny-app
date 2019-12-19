import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, Visual} from './product.model';
import {map} from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;
    auth_token: string;

    constructor(private _http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getVisuals(): Observable<Visual[]> {
        return this._http.get<Visual[]>(this.baseUrl + 'visual');
    }

    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(this.baseUrl + 'products');
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this._http.post<any>(this.baseUrl + 'login', {
            name: user, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    }

    saveProduct(product: Product): Observable<Product> {
        return this._http.post<Product>(this.baseUrl + 'products',
            product, this.getOptions());
    }

    updateProduct(product): Observable<Product> {
        return this._http.put<Product>(`${this.baseUrl}products/${product.id}`,
            product, this.getOptions());
    }

    deleteProduct(id: number): Observable<Product> {
        return this._http.delete<Product>(`${this.baseUrl}products/${id}`,
            this.getOptions());
    }
    saveVisual(visual: Visual): Observable<Visual> {
        return this._http.post<Visual>(this.baseUrl + 'visual',
            visual, this.getOptions());
    }

    updateVisual(visual): Observable<Visual> {
        return this._http.put<Visual>(`${this.baseUrl}visual/${visual.id}`,
            visual, this.getOptions());
    }

    deleteVisual(id: number): Observable<Product> {
        return this._http.delete<Product>(`${this.baseUrl}visual/${id}`,
            this.getOptions());
    }

    // getOrders(): Observable<Order[]> {
    //     return this.http.get<Order[]>(this.baseUrl + 'orders', this.getOptions());
    // }

    // deleteOrder(id: number): Observable<Order> {
    //     return this.http.delete<Order>(`${this.baseUrl}orders/${id}`,
    //         this.getOptions());
    // }
    //
    // updateOrder(order: Order): Observable<Order> {
    //     return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,
    //         this.getOptions());
    // }

    private getOptions() {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer<${this.auth_token}>`
            })
        };
    }


}
