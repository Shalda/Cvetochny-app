import {Injectable} from '@angular/core';
import {ClientData} from './client-data.model';
import {RestDataSource} from './rest.datasource';
import {Order} from './order.model';

@Injectable({
    providedIn: 'root'
})
export class SendEmailService {
    constructor(private _restData: RestDataSource) {
    }

    public sendEmail(
        source: string,
        name: string,
        phone: any,
        _id?: string,
        _product?: string,
        emailAddress?: string,
        message?: string,
        order?: Order) {
        const userData: ClientData = {
            name: name,
            phone: phone,
        };
        let linkUrl;
        if (emailAddress) {
            userData.email = emailAddress;
        }
        if (message) {
            userData.message = message;
        }
        if (_id) {
            userData._id = _id;
        }
        if (_product) {
            userData.product = _product;
        }
        if (order) {
            userData.order = order;
        }
        switch (source) {
            case '':
                linkUrl = '';
                break;
            case 'click':
                linkUrl = 'oneclick';
                break;
            case 'order':
                linkUrl = 'order';
                break;
            case 'visual':
                linkUrl = 'visual';
                break;
            default:
                linkUrl = '';
        }

        return this._restData.sendEmail(userData, linkUrl);
    }
}
