import {Injectable} from '@angular/core';
import {Order} from './order.model';
import {RestDataSource} from './rest.datasource';
import {Observable} from 'rxjs';

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded = false;
    constructor(private dataSource: RestDataSource) {
    }
    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders()
            .subscribe(orders => {
                    this.orders = orders.orders;
            });
    }

    getOrders(): Order[] {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }


    saveOrder(order: Order): Observable<{ message: string, order: Order }> {
        return this.dataSource.saveOrder(order);
    }
    updateOrder(order: Order) {
        this.dataSource.updateOrder(order).subscribe(order => {
            this.orders.splice(this.orders.
            findIndex(o => o._id === order.order._id), 1, order.order);
        });
    }
    deleteOrder(id: string) {
        this.dataSource.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => id === o._id), 1);
        });
    }
}
