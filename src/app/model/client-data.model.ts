import {Order} from './order.model';

export interface ClientData {
    name: string;
    phone: number;
    email?: string;
    message?: string;
    _id?: string;
    product?: string;
    order?: Order;
}
