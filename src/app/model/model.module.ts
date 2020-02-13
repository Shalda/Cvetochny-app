import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RestDataSource} from './rest.datasource';
import {ProductRepository} from './product.repository';
import {VisualModelResolver} from './visual.resolver';
import {AuthService} from './auth.service';
import {SendEmailService} from './send-email.service';
import {Cart} from './cart.model';
import {Order} from './order.model';
import {OrderRepository} from './order.repository';


@NgModule({
    imports: [HttpClientModule],
    providers: [RestDataSource, ProductRepository, VisualModelResolver, AuthService, SendEmailService, Cart, Order, OrderRepository],
})
export class ModelModule {
}

