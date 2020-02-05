import {Component, OnInit} from '@angular/core';
import {OrderRepository} from '../model/order.repository';
import {Order} from '../model/order.model';

@Component({
    selector: 'app-order-table',
    templateUrl: './orderTable.component.html',
    styleUrls: ['./orderTable.component.css']
})
export class OrderTableComponent implements OnInit {
    includeShipped = false;

    constructor(private repository: OrderRepository) {
    }

    getOrders(): Order[] {
        return this.repository.getOrders()
            .filter(o => this.includeShipped || !o.shipped);
    }

    markShipped(order: Order) {
        order.shipped = !order.shipped;
        this.repository.updateOrder(order);
    }


    delete(id: string) {
        this.repository.deleteOrder(id);
    }

    ngOnInit() {
    }

}
