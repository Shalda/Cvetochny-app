import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product, Visual} from './product.model';
import {AuthData} from './auth-data';
import {Router} from '@angular/router';
import {ClientData} from './client-data.model';
import {environment} from '../../environments/environment';
import {Order} from './order.model';
import {Observable} from 'rxjs';


@Injectable()
export class RestDataSource {
    dbUrl: string = environment.apiUrl;

    constructor(private _http: HttpClient, private _router: Router) {

    }

    getVisuals(): Observable<{ message: string, visuals: Visual[] }> {
        return this._http.get<{ message: string, visuals: Visual[] }>(this.dbUrl + 'visuals');
    }

    getProducts(): Observable<{ message: string, products: Product[] }> {
        return this._http.get<{ message: string, products: Product[] }>(this.dbUrl + 'products');
    }

    getProduct(id: string): Observable<{ message: string, product: Product }> {
        return this._http.get<{ message: string, product: Product }>(`${this.dbUrl}products/${id}`);
    }

    authenticate(user: string, pass: string): Observable<{ token: string, expiresIn: number, userId: string }> {
        const authData: AuthData = {username: user, password: pass};
        return this._http.post<{ token: string, expiresIn: number, userId: string }>(this.dbUrl + 'user/' + 'login', authData);
    }


    sendEmail(userData: ClientData, linkUrl: string) {
        return this._http.post(this.dbUrl + 'sendmail/' + linkUrl, userData);
    }

    createUser(email: string, user: string, pass: string) {
        const authData: AuthData = {email: email, username: user, password: pass};
        this._http.post(this.dbUrl + 'user/' + 'signup', authData).subscribe(
            () => {
                this._router.navigate(['/']);
            },
            error => {
                console.log(error.Error);
            }
        );
    }

    saveProduct(product: FormData): Observable<{ message: string, product: Product }> {
        return this._http.post<{ message: string, product: Product }>(this.dbUrl + 'products', product);
    }

    saveVisual(visual: FormData): Observable<{ message: string, visual: Visual }> {
        return this._http.post<{ message: string, visual: Visual }>(this.dbUrl + 'visuals',
            visual);
    }

    updateProduct(product: Product | FormData, id): Observable<{ message: string, product: Product }> {
        return this._http.put<{ message: string, product: Product }>(`${this.dbUrl}products/${id}`,
            product);
    }

    updateVisual(visual: Visual | FormData, id): Observable<{ message: string, visual: Visual }> {
        return this._http.put<{ message: string, visual: Visual }>(`${this.dbUrl}visuals/${id}`,
            visual);
    }

    deleteProduct(id: number): Observable<{ message: string, product: Product }> {
        return this._http.delete<{ message: string, product: Product }>(`${this.dbUrl}products/${id}`);
    }

    deleteVisual(id: number): Observable<{ message: string, visual: Visual }> {
        return this._http.delete<{ message: string, visual: Visual }>(`${this.dbUrl}visuals/${id}`);
    }

    saveOrder(order: Order): Observable<{ message: string, order: Order }> {
        return this._http.post<{ message: string, order: Order }>(this.dbUrl + 'orders', order);
    }

    getOrders(): Observable<{ message: string, orders: Order[] }> {
        return this._http.get<{ message: string, orders: Order[] }>(this.dbUrl + 'orders');
    }

    deleteOrder(id: string): Observable<{ message: string, order: Order }> {
        return this._http.delete<{ message: string, order: Order }>(`${this.dbUrl}orders/${id}`);
    }

    updateOrder(order: Order): Observable<{ message: string, order: Order }> {
        return this._http.put<{ message: string, order: Order }>(`${this.dbUrl}orders/${order._id}`, order);
    }

    sendSMS(opt: string) {
        console.log(`sending in route`);
        const arg = {text : opt};
        // this._http.post(this.dbUrl + 'sms', arg).subscribe(
        //     () => {
        //         console.log(
        //             `sms has been sent`
        //         );
        //     },
        //     err => {
        //         console.log(err);
        //     }
        // );
    }

}
