import {Injectable} from '@angular/core';
import {ClientData} from './client-data.model';
import {RestDataSource} from './rest.datasource';

@Injectable({
    providedIn: 'root'
})
export class SendEmailService {
    constructor(private _restData: RestDataSource) {
    }

    public sendEmail(name: string, phone: number, _id?: string, _product?: string, emailAddress?: string, message?: string) {
        const userData: ClientData = {
            name: name,
            phone: phone,
        };
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
        return this._restData.sendEmail(userData);
    }
}
